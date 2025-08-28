import { drizzle as drizzleClient } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { env } from '@/lib/env';
import { config } from '~/drizzle.config';

import * as schema from './schema';

const db = drizzleClient({
  casing: config.casing,
  client: new pg.Pool({
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    max:
      env.DB_DROP || env.DB_MIGRATE || env.DB_PUSH || env.DB_SEED ?
        1
      : env.DB_MAX_CONNECTIONS,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    user: env.DB_USER,
  }),
  logger: true,
  schema,
});

export { db };
