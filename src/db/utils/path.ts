import fs from 'node:fs';
import path from 'node:path';

import { sync as globSync } from 'glob';

const SCHEMAS_PATH = path.join(process.cwd(), 'src', 'db', 'schemas');

function getSeedDataPath(
  schema: string,
  tableName: string,
  file: string,
): string {
  const seedDataPath = getTables(file).get(`${schema}.${tableName}`);

  if (!seedDataPath) {
    throw new Error(
      `Seed data path not found for ${schema}.${tableName} ${file}`,
    );
  }

  return `${seedDataPath}/${file}`;
}

function getTables(file: string): Map<string, string> {
  const tables = new Map<string, string>();

  const schemas = fs
    .readdirSync(SCHEMAS_PATH)
    .filter((name) => fs.statSync(path.join(SCHEMAS_PATH, name)).isDirectory())
    .map((name) => name.replaceAll('-', '_'));

  for (const schema of schemas) {
    const tablesDir = path.join(SCHEMAS_PATH, schema, 'tables');

    if (!fs.existsSync(tablesDir) || !fs.statSync(tablesDir).isDirectory()) {
      throw new Error(`Schema '${schema}' must have a 'tables' directory`);
    }

    for (const match of globSync(path.join(tablesDir, '**', file))) {
      const tableName = path
        .relative(tablesDir, match)
        .split(path.sep)
        .slice(0, -1)
        .reverse()
        .join('_')
        .replaceAll('-', '_');

      tables.set(`${schema}.${tableName}`, path.dirname(match));
    }
  }

  return tables;
}

export { getSeedDataPath, getTables };
