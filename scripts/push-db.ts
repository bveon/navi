import { db } from '@/db';
import { triggerFunctions } from '@/db/trigger-functions';
import { triggers } from '@/db/triggers';
import { env } from '@/lib/env';
import { config } from '~/drizzle.config';

import type { Trigger, TriggerFunction } from '@/db/utils/types';

if (!env.DB_PUSH) {
  throw new Error('DB_PUSH must be set to "true" to run push.');
}

async function insertTriggerFunctions(
  schema: string,
  triggerFunctions: TriggerFunction[],
): Promise<void> {
  for (const triggerFunction of triggerFunctions) {
    if (schema === triggerFunction.schema) {
      await db.execute(triggerFunction.query);
    }
  }
}

async function insertTriggers(
  schema: string,
  triggers: Trigger[],
): Promise<void> {
  for (const trigger of triggers) {
    if (schema === trigger.schema) {
      await db.execute(trigger.query);
    }
  }
}

async function push(
  schemaFilter: string[],
  options: {
    triggerFunctions?: TriggerFunction[];
    triggers?: Trigger[];
  },
): Promise<void> {
  for (const schema of schemaFilter) {
    if (options.triggerFunctions) {
      await insertTriggerFunctions(schema, options.triggerFunctions);
    }

    if (options.triggers) {
      await insertTriggers(schema, options.triggers);
    }
  }

  await db.$client.end();
}

try {
  await push(config.schemaFilter, {
    triggerFunctions,
    triggers,
  });
} catch (error) {
  console.error(error);
}
