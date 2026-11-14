import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'astro/zod';
import raw from '../data/publications.json';
import type { Lang } from './i18n';

/**
 * Esquema de uma publicação. Para adicionar um artigo, basta um novo registro
 * em src/data/publications.json e o PDF em public/publicacoes/.
 * O build falha com uma mensagem clara se algum campo estiver errado.
 */
const Publication = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'use só letras minúsculas, números e hífen'),
  titulo: z.string().min(1),
  titulo_en: z.string().optional(),
  autores: z.array(z.string().min(1)).min(1),
  local: z.string().min(1),
  local_en: z.string().optional(),
  status: z.string().min(1),
  status_en: z.string().optional(),
  ano: z.number().int(),
  data: z
    .string()
    .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'formato AAAA, AAAA-MM ou AAAA-MM-DD')
    .optional(),
  tipo: z
    .enum(['article', 'inproceedings', 'unpublished', 'misc', 'mastersthesis', 'techreport'])
    .default('misc'),
  idioma: z.enum(['pt', 'en']).default('pt'),
  citavel: z.boolean().default(true),
  resumo: z.string().min(1),
  abstract: z.string().min(1),
  tags: z.array(z.string()).default([]),
  pdf: z.string().startsWith('/'),
  doi: z.string().optional(),
});

export type Publication = z.infer<typeof Publication>;

function load(): Publication[] {
  const result = z.array(Publication).safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - publications.json [${i.path.join('.')}]: ${i.message}`)
      .join('\n');
    throw new Error(`Publicação inválida:\n${issues}`);
  }
  const pubs = result.data;

  const slugs = new Set<string>();
  for (const p of pubs) {
    if (slugs.has(p.slug)) throw new Error(`Slug repetido em publications.json: ${p.slug}`);
    slugs.add(p.slug);
    if (!existsSync(join(process.cwd(), 'public', p.pdf))) {
      throw new Error(`PDF não encontrado para "${p.slug}": public${p.pdf}`);
    }
  }

  return pubs.sort((a, b) => (b.data ?? String(b.ano)).localeCompare(a.data ?? String(a.ano)));
}

export const publications = load();

export function pubPath(p: Publication, lang: Lang): string {
  return lang === 'pt' ? `/publicacoes/${p.slug}/` : `/en/publications/${p.slug}/`;
}

export const field = {
  local: (p: Publication, lang: Lang) => (lang === 'en' && p.local_en) || p.local,
  status: (p: Publication, lang: Lang) => (lang === 'en' && p.status_en) || p.status,
};

/** "Rafael Mendes Pinto" -> "Pinto, Rafael Mendes". Nomes já com vírgula são mantidos. */
function bibAuthor(name: string): string {
  if (name.includes(',')) return name.trim();
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const last = parts.pop();
  return `${last}, ${parts.join(' ')}`;
}

function bibEscape(s: string): string {
  return s.replace(/([&%$#_{}])/g, String.raw`\$1`);
}

function ascii(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]/g, '')
    .toLowerCase();
}

export function bibtexKey(p: Publication): string {
  const surname = bibAuthor(p.autores[0]).split(',')[0];
  return `${ascii(surname)}${p.ano}${ascii(p.slug.split('-')[0])}`;
}

export function bibtex(p: Publication, site: URL): string {
  const fields: [string, string][] = [
    ['author', p.autores.map(bibAuthor).join(' and ')],
    ['title', p.titulo],
  ];
  switch (p.tipo) {
    case 'article':
      fields.push(['journal', p.local]);
      break;
    case 'inproceedings':
      fields.push(['booktitle', p.local]);
      break;
    case 'mastersthesis':
      fields.push(['school', p.local]);
      break;
    case 'techreport':
      fields.push(['institution', p.local]);
      break;
    case 'unpublished':
      fields.push(['note', `${p.status}. ${p.local}`]);
      break;
    default:
      fields.push(['howpublished', p.local], ['note', p.status]);
  }
  fields.push(['year', String(p.ano)]);
  if (p.doi) fields.push(['doi', p.doi]);
  fields.push(['url', new URL(pubPath(p, 'pt'), site).href]);

  const body = fields
    .map(([k, v]) => {
      const value = k === 'url' || k === 'doi' ? v : bibEscape(v);
      // Chaves duplas no título preservam maiúsculas (ex.: "AWS").
      const wrapped = k === 'title' ? '{{' + value + '}}' : '{' + value + '}';
      return `  ${k.padEnd(12)}= ${wrapped}`;
    })
    .join(',\n');
  return `@${p.tipo}{${bibtexKey(p)},\n${body}\n}`;
}

/** Data no formato que o Google Scholar espera: AAAA/MM/DD, AAAA/MM ou AAAA. */
export function scholarDate(p: Publication): string {
  return (p.data ?? String(p.ano)).replaceAll('-', '/');
}
