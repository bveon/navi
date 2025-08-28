import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const degree = pgTable(
  'degree',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull().unique(),
    abbreviation: text().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { degree };
