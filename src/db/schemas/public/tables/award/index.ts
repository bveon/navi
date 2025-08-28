import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const award = pgTable(
  'award',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull().unique(),
    award: text().notNull(),
    ksp: text().notNull(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { award };
