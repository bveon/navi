import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

const programType = pgTable(
  'program_type',
  /* eslint-disable perfectionist/sort-objects */
  {
    code: varchar({ length: 3 }).primaryKey(),
    abbreviation: text().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { programType };
