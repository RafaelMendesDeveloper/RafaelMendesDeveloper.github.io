# rafaelmendesdeveloper.github.io

Site pessoal e acadêmico de Rafael Mendes Pinto. Feito com [Astro](https://astro.build), gera HTML estático e não usa JavaScript no cliente (a única exceção é o botão "Copiar" do BibTeX, que só aparece quando o JS está ligado).

## Rodar localmente

Requer Node 22.23 ou superior.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve dist/
```

## Onde fica cada coisa

| O quê | Arquivo |
|---|---|
| Textos da página principal (PT e EN) | `src/data/profile.ts` |
| Publicações | `src/data/publications.json` |
| PDFs das publicações | `public/publicacoes/` |
| Currículo | `public/curriculo-rafael-mendes-pinto.pdf` |
| Foto | `src/assets/rafael-mendes-pinto.png` |
| Estilo (cores, tipografia) | `src/styles/global.css` |
| Rótulos de interface (PT e EN) | `src/lib/i18n.ts` |
| Imagem de compartilhamento | `public/og.png` (para gerar de novo: `npm run og`) |

## Adicionar uma publicação

1. Copie o PDF para `public/publicacoes/<slug>.pdf`.
2. Adicione um registro em `src/data/publications.json`:

```json
{
  "slug": "meu-artigo",
  "titulo": "Título original do artigo",
  "titulo_en": "English title (opcional, aparece na versão em inglês)",
  "autores": ["Rafael Mendes Pinto", "Fulano de Tal"],
  "local": "Anais do SBSeg 2027",
  "local_en": "Proceedings of SBSeg 2027",
  "status": "Aceito",
  "status_en": "Accepted",
  "ano": 2027,
  "data": "2027-09",
  "tipo": "inproceedings",
  "idioma": "pt",
  "citavel": true,
  "resumo": "Resumo em português.",
  "abstract": "Abstract in English.",
  "tags": ["Serverless", "AWS"],
  "pdf": "/publicacoes/meu-artigo.pdf",
  "doi": "10.5753/sbseg.2027.12345"
}
```

3. Faça commit e push. As páginas `/publicacoes/<slug>/` e `/en/publications/<slug>/`, o item na lista e o BibTeX são gerados automaticamente.

Sobre os campos:

- **Obrigatórios:** `slug`, `titulo`, `autores`, `local`, `status`, `ano`, `resumo`, `abstract` e `pdf`. Os demais são opcionais.
- **`tipo`:** define o tipo de entrada BibTeX. Valores aceitos: `article` (periódico), `inproceedings` (evento), `unpublished`, `misc`, `mastersthesis` e `techreport`.
- **`citavel`:** com `false`, a página não mostra o BibTeX e não publica as metatags do Google Scholar. Use para manuscritos que ainda não devem ser citados e mude para `true` quando o artigo sair.
- **`data`:** `AAAA`, `AAAA-MM` ou `AAAA-MM-DD`. Ordena a lista (mais recente primeiro) e vira o `citation_publication_date`.
- **`autores`:** no BibTeX, a última palavra do nome vira o sobrenome ("Rafael Mendes Pinto" → "Pinto, Rafael Mendes"). Para sobrenome composto, escreva já com vírgula: `"Mendes Pinto, Rafael"`.

Se faltar um campo obrigatório, o slug se repetir ou o PDF não estiver na pasta, o `npm run build` falha e diz qual registro está errado.

## Deploy no GitHub Pages

O deploy é automático: cada push na branch `main` roda o workflow `.github/workflows/deploy.yml`, que faz o build e publica a pasta `dist/`.

Configuração única, feita no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Para acompanhar um deploy, abra a aba **Actions** do repositório. Para publicar de novo sem um commit novo, use **Run workflow** no workflow "Deploy no GitHub Pages".

## Licenças

As fontes Inter Tight e IBM Plex Mono estão sob a SIL Open Font License 1.1 (veja `public/fonts/`). A Neue Montreal é comercial: para ativá-la, siga o passo a passo no topo de `src/styles/global.css`.
