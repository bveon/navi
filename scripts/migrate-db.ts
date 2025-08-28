import { migrate as drizzleMigrate } from 'drizzle-orm/node-postgres/migrator';

import { db } from '@/db';
import { env } from '@/lib/env';
import { config } from '~/drizzle.config';

if (!env.DB_MIGRATE) {
  throw new Error('DB_MIGRATE must be set to "true" to run migrate.');
}

async function migrate(): Promise<void> {
  await drizzleMigrate(db, {
    migrationsFolder: config.out,
    migrationsSchema: config.migrations.schema,
    migrationsTable: config.migrations.table,
  });

  await db.$client.end();
}

try {
  await migrate();
} catch (error) {
  console.error(error);
}
