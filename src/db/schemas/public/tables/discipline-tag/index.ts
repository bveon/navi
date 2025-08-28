import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const disciplineTag = pgTable(
  'discipline_tag',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    japaneseName: text().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { disciplineTag };
