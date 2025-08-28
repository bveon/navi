import { sql } from 'drizzle-orm';
import { check, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

const country = pgTable(
  'country',
  /* eslint-disable perfectionist/sort-objects */
  {
    code: varchar({ length: 2 }).primaryKey(),
    name: text().notNull(),
    japaneseName: text().notNull(),
    tuitionCurrency: varchar({ length: 3 }).notNull(),
    sort: integer().notNull(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`)],
).enableRLS();

export { country };
