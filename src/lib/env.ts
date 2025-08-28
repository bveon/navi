import { config } from 'dotenv';
import { z } from 'zod';

const stringBoolean = z.string().transform((value) => value === 'true');

const envSchema = z.object({
  DB_DATABASE: z.string().min(1),
  DB_DROP: stringBoolean.default('false'),
  DB_DROP_SCHEMA: stringBoolean.default('false'),
  DB_HOST: z.string().min(1),
  DB_MAX_CONNECTIONS: z.coerce.number().min(1).default(10),
  DB_MIGRATE: stringBoolean.default('false'),
  DB_PASSWORD: z.string().min(1),
  DB_PORT: z.coerce.number().min(1),
  DB_PUSH: stringBoolean.default('false'),
  DB_SEED: stringBoolean.default('false'),
  DB_USER: z.string().min(1),
  NODE_ENV: z.string().default('development'),
});

config({
  path: './.env',
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    let message = 'Missing required values in .env:\n';

    for (const issue of error.issues) {
      message += `${issue.path[0]}\n`;
    }

    throw new Error(message);
  } else {
    throw error;
  }
}

const env = envSchema.parse(process.env);

export { env };
