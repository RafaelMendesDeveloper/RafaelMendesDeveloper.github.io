import type { Lang } from '../lib/i18n';

/** Datas no formato AAAA-MM. `end: null` significa "presente". */
interface Position {
  title: string;
  start: string;
  end: string | null;
}

interface Job {
  company: string;
  location: string;
  positions: Position[];
  bullets: string[];
}

interface Degree {
  title: string;
  institution: string;
  location: string;
  start: string;
  end: string | null;
  focus?: string;
}

interface Profile {
  name: string;
  role: string;
  description: string;
  about: string;
  experience: Job[];
  education: Degree[];
  skills: { label: string; items: string }[];
}

export const contact = {
  email: 'rafael.mendes.negocios@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rafael-mendes123/',
  linkedinLabel: 'linkedin.com/in/rafael-mendes123',
  github: 'https://github.com/RafaelMendesDeveloper',
  githubLabel: 'github.com/RafaelMendesDeveloper',
  cv: '/curriculo-rafael-mendes-pinto.pdf',
};

export const profile: Record<Lang, Profile> = {
  pt: {
    name: 'Rafael Mendes Pinto',
    role: 'Engenheiro de Software · Full-Stack (Mobile & Backend) · AWS',
    description:
      'Engenheiro de software full-stack em fintech (Go, Node.js, React Native, AWS) e mestrando em Ciência da Computação na UFSC, pesquisando segurança em ambientes serverless.',
    about:
      'Engenheiro de software full-stack com mais de 2 anos de experiência em fintech, trabalhando com Go, Node.js, React Native e AWS em sistemas de alta escala. Sou mestrando em Ciência da Computação na UFSC, onde pesquiso segurança em ambientes serverless, e pós-graduando em Engenharia de Cloud na PUC-PR.',
    experience: [
      {
        company: 'Wiipo (Senior Sistemas)',
        location: 'Remoto',
        positions: [
          { title: 'Engenheiro de Software', start: '2025-01', end: null },
          { title: 'Estagiário de Desenvolvimento', start: '2024-09', end: '2025-01' },
        ],
        bullets: [
          'Atuei na refatoração da arquitetura de processamento de mais de 9 milhões de holerites mensais com Go, DynamoDB (single-table design) e S3 Directory Buckets, reduzindo o custo de infraestrutura em US$ 1.800/mês e o tempo de processamento em 80%.',
          'Atuei na atualização do React Native da versão 0.74 para a 0.85 em um aplicativo com mais de 3 milhões de usuários, dentro do prazo exigido pelas lojas e sem interrupção do serviço.',
          'Reestruturei a arquitetura de eventos do aplicativo relacionada a holerites.',
          'Tornei-me referência técnica da squad no domínio de holerites, resolvendo chamados críticos e evoluindo o produto.',
          'Corrigi vulnerabilidades no fluxo de autenticação do aplicativo.',
        ],
      },
      {
        company: 'Lince Tech',
        location: 'Presencial',
        positions: [{ title: 'Estagiário de Desenvolvimento Mobile', start: '2024-06', end: '2024-09' }],
        bullets: [
          'Desenvolvi um aplicativo em Flutter para concessionárias.',
          'Trabalhei em equipe com metodologias ágeis.',
        ],
      },
    ],
    education: [
      {
        title: 'Mestrado em Ciência da Computação (em andamento)',
        institution: 'Universidade Federal de Santa Catarina (UFSC)',
        location: 'Florianópolis, SC',
        start: '2026-07',
        end: null,
        focus: 'Programação distribuída, segurança web, segurança de APIs e IA.',
      },
      {
        title: 'Pós-graduação em Engenharia de Cloud (em andamento)',
        institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
        location: 'Remoto',
        start: '2026-01',
        end: '2027-06',
        focus: 'Escalabilidade, segurança e integridade.',
      },
      {
        title: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
        institution: 'Instituto Federal de Santa Catarina (IFSC)',
        location: 'Gaspar, SC',
        start: '2023-01',
        end: '2026-01',
        focus: 'Algoritmos e metodologias ágeis.',
      },
    ],
    skills: [
      { label: 'Back-end e linguagens', items: 'Go, Node.js, TypeScript, JavaScript, Dart' },
      { label: 'Front-end e mobile', items: 'React Native, React, Flutter' },
      { label: 'Bancos de dados', items: 'DynamoDB, PostgreSQL, MySQL, MongoDB, Oracle' },
      {
        label: 'AWS',
        items: 'Lambda, EC2, ELB, DynamoDB, S3, CloudWatch, WAF, Fault Injection Service',
      },
      { label: 'Idiomas', items: 'Português (nativo), Inglês (fluente, C1)' },
    ],
  },

  en: {
    name: 'Rafael Mendes Pinto',
    role: 'Software Engineer · Full-Stack (Mobile & Backend) · AWS',
    description:
      'Full-stack software engineer in fintech (Go, Node.js, React Native, AWS) and M.Sc. student in Computer Science at UFSC, researching security in serverless environments.',
    about:
      'Full-stack software engineer with more than 2 years of experience in fintech, working with Go, Node.js, React Native, and AWS on high-scale systems. I am an M.Sc. student in Computer Science at the Federal University of Santa Catarina (UFSC), where I research security in serverless environments, and a graduate student in Cloud Engineering at PUC-PR.',
    experience: [
      {
        company: 'Wiipo (Senior Sistemas)',
        location: 'Remote',
        positions: [
          { title: 'Software Engineer', start: '2025-01', end: null },
          { title: 'Software Development Intern', start: '2024-09', end: '2025-01' },
        ],
        bullets: [
          'Worked on redesigning the processing architecture for more than 9 million monthly payslips using Go, DynamoDB (single-table design), and S3 Directory Buckets, cutting infrastructure costs by US$1,800/month and processing time by 80%.',
          'Worked on upgrading React Native from 0.74 to 0.85 in an app with more than 3 million users, within the app stores’ deadline and with no service interruption.',
          'Restructured the app’s payslip event architecture.',
          'Became the squad’s technical reference for the payslip domain, resolving critical incidents and evolving the product.',
          'Fixed vulnerabilities in the app’s authentication flow.',
        ],
      },
      {
        company: 'Lince Tech',
        location: 'On-site',
        positions: [{ title: 'Mobile Development Intern', start: '2024-06', end: '2024-09' }],
        bullets: [
          'Built a Flutter app for car dealerships.',
          'Worked in a team following agile methodologies.',
        ],
      },
    ],
    education: [
      {
        title: 'M.Sc. in Computer Science (in progress)',
        institution: 'Federal University of Santa Catarina (UFSC)',
        location: 'Florianópolis, Brazil',
        start: '2026-07',
        end: null,
        focus: 'Distributed programming, web security, API security, and AI.',
      },
      {
        title: 'Graduate Certificate in Cloud Engineering (in progress)',
        institution: 'Pontifical Catholic University of Paraná (PUC-PR)',
        location: 'Remote',
        start: '2026-01',
        end: '2027-06',
        focus: 'Scalability, security, and integrity.',
      },
      {
        title: 'Technology Degree in Systems Analysis and Development',
        institution: 'Federal Institute of Santa Catarina (IFSC)',
        location: 'Gaspar, Brazil',
        start: '2023-01',
        end: '2026-01',
        focus: 'Algorithms and agile methodologies.',
      },
    ],
    skills: [
      { label: 'Back-end & languages', items: 'Go, Node.js, TypeScript, JavaScript, Dart' },
      { label: 'Front-end & mobile', items: 'React Native, React, Flutter' },
      { label: 'Databases', items: 'DynamoDB, PostgreSQL, MySQL, MongoDB, Oracle' },
      {
        label: 'AWS',
        items: 'Lambda, EC2, ELB, DynamoDB, S3, CloudWatch, WAF, Fault Injection Service',
      },
      { label: 'Languages', items: 'Portuguese (native), English (fluent, C1)' },
    ],
  },
};
