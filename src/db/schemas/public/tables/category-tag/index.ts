import { sql } from 'drizzle-orm';
import { check, integer, pgTable, text } from 'drizzle-orm/pg-core';

const categoryTag = pgTable(
  'category_tag',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    japaneseName: text().notNull(),
    sort: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`)],
).enableRLS();

export { categoryTag };
