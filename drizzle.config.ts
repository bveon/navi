import { defineConfig, type Config } from 'drizzle-kit';

import { env } from '@/lib/env';

const config = {
  casing: 'snake_case',
  dbCredentials: {
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    ssl: env.NODE_ENV === 'production',
    user: env.DB_USER,
  },
  dialect: 'postgresql',
  migrations: {
    schema: 'migrations',
    table: 'drizzle',
  },
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  schemaFilter: ['public'],
  strict: true,
  verbose: true,
} satisfies Config;

const drizzleConfig = defineConfig(config);

export { config };

export default drizzleConfig;
