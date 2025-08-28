import { getTableName, sql } from 'drizzle-orm';
import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { seeds } from '@/db/seeds';
import { tables } from '@/db/tables';
import { getSeedDataPath } from '@/db/utils/path';
import { Seed } from '@/db/utils/seed';
import { env } from '@/lib/env';
import { config } from '~/drizzle.config';

if (!env.DB_SEED) {
  throw new Error('DB_SEED must be set to "true" to run seed.');
}

async function seedTables(
  schema: string,
  seeds: Seed<PgTable, object>[],
): Promise<void> {
  for (const seed of seeds) {
    const tableSchema = getTableConfig(seed.table).schema ?? 'public';

    if (tableSchema === schema) {
      const tableName = getTableName(seed.table);

      const file = getSeedDataPath(tableSchema, tableName, 'data.csv');

      for await (const batch of seed.getDataFromCsv(file)) {
        if (batch.length > 0) {
          await db.insert(seed.table).values(batch);
        }
      }
    }
  }
}

async function truncateTables(
  schema: string,
  tables: PgTable[],
): Promise<void> {
  for (const table of tables) {
    const tableSchema = getTableConfig(table).schema ?? 'public';

    if (tableSchema === schema) {
      const tableName = getTableName(table);

      const query = `TRUNCATE TABLE ${tableSchema}.${tableName} RESTART IDENTITY CASCADE`;

      await db.execute(sql.raw(query));
    }
  }
}

async function seed(
  schemaFilter: string[],
  tables: PgTable[],
  seeds: Seed<PgTable, object>[],
): Promise<void> {
  for (const schema of schemaFilter) {
    await truncateTables(schema, tables);

    await seedTables(schema, seeds);
  }

  await db.$client.end();
}

try {
  await seed(config.schemaFilter, tables, seeds);
} catch (error) {
  console.error(error);
}
