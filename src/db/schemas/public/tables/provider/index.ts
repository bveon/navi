import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { providerTypeEnum } from '../../enums';

const provider = pgTable(
  'provider',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull().unique(),
    abbreviation: text().notNull().unique(),
    type: providerTypeEnum().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { provider };
