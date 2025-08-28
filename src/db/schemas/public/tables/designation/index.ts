import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const designation = pgTable(
  'designation',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull(),
    japaneseName: text().notNull(),
    iconUrl: text().notNull(),
    description: text().notNull(),
    aCode: text().notNull().unique(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { designation };
