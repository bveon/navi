import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const award = pgTable(
  'award',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    award: text().notNull(),
    ksp: text().notNull(),
    aLongName: text().notNull().unique(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { award };
