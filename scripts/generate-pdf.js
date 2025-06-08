import markdownpdf from 'markdown-pdf';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = join(__dirname, '../docs/project-documentation.md');
const outputFile = join(__dirname, '../docs/project-documentation.pdf');

markdownpdf()
  .from(inputFile)
  .to(outputFile, () => {
    console.log('PDF has been generated successfully!');
  }); 