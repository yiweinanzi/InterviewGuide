import fs from 'node:fs/promises';
import path from 'node:path';

import { parseCompany } from './lib/parse_company';
import { parseKnowledge } from './lib/parse_knowledge';

async function main() {
  const root = process.cwd();
  const knowledgePath = path.join(root, '..', 'result', 'output', 'knowledge_summary.md');
  const companyPath = path.join(root, '..', 'result', 'output', 'company_summary.md');

  const [knowledgeRows, companyRows] = await Promise.all([
    parseKnowledge(knowledgePath),
    parseCompany(companyPath),
  ]);

  const outputDir = path.join(root, 'src', 'data');
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(
    path.join(outputDir, 'questions.raw.json'),
    `${JSON.stringify(knowledgeRows, null, 2)}\n`,
    'utf-8',
  );

  await fs.writeFile(
    path.join(outputDir, 'companies.raw.json'),
    `${JSON.stringify(companyRows, null, 2)}\n`,
    'utf-8',
  );

  console.log(`knowledge rows: ${knowledgeRows.length}`);
  console.log(`company rows: ${companyRows.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
