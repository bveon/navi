import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const programType = pgTable(
  'program_type',
  /* eslint-disable perfectionist/sort-objects */
  {
    code: varchar({ length: 3 }).primaryKey(),
    abbreviation: text().notNull(),
    tidName: integer().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { programType };
