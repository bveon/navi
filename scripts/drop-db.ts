import { getTableName, sql } from 'drizzle-orm';
import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { tables } from '@/db/tables';
import { env } from '@/lib/env';
import { config } from '~/drizzle.config';

if (!env.DB_DROP) {
  throw new Error('DB_DROP must be set to "true" to run drop.');
}

async function dropSchema(schema: string): Promise<void> {
  const query = `DROP SCHEMA IF EXISTS ${schema} CASCADE`;

  await db.execute(sql.raw(query));
}

async function dropTables(schema: string, tables: PgTable[]): Promise<void> {
  for (const table of tables) {
    const tableSchema = getTableConfig(table).schema ?? 'public';

    if (tableSchema === schema) {
      const tableName = getTableName(table);

      const query = `DROP TABLE IF EXISTS ${tableSchema}.${tableName} CASCADE`;

      await db.execute(sql.raw(query));
    }
  }
}

async function drop(
  schemaFilter: string[],
  options: {
    dropSchema?: boolean;
    tables?: PgTable[];
  },
): Promise<void> {
  for (const schema of schemaFilter) {
    if (options.tables) {
      await dropTables(schema, options.tables);
    }

    if (options.dropSchema && schema !== 'public') {
      await dropSchema(schema);
    }
  }

  await db.$client.end();
}

try {
  await drop(config.schemaFilter, {
    dropSchema: env.DB_DROP_SCHEMA,
    tables,
  });
} catch (error) {
  throw new Error(error as string);
}
