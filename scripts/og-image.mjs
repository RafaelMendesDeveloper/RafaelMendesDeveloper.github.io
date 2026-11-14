// Gera public/og.png (1200x630) para Open Graph. Rode com: npm run og
// Só precisa rodar de novo se mudar o nome ou o cargo.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#23252a"/>
  <rect x="96" y="214" width="56" height="3" fill="#9cc0ea"/>
  <text x="96" y="310" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="72" font-weight="500" fill="#e9e7e2">Rafael Mendes Pinto</text>
  <text x="96" y="372" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="34" fill="#a4a6ad">Engenheiro de Software · Full-Stack (Mobile &amp; Backend) · AWS</text>
  <text x="96" y="420" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="34" fill="#a4a6ad">Mestrando em Ciência da Computação, UFSC</text>
  <text x="96" y="540" font-family="Menlo, 'Courier New', monospace" font-size="24" fill="#a4a6ad">rafaelmendesdeveloper.github.io</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('public/og.png gerado');
