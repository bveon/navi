import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const designation = pgTable(
  'designation',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    japaneseName: text().notNull(),
    iconUrl: text().notNull(),
    description: text().notNull(),
    aCode: text().notNull().unique(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { designation };
