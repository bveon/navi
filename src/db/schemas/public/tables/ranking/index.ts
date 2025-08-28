import { integer, pgTable, text, unique } from 'drizzle-orm/pg-core';

import { university } from '../university';

const ranking = pgTable(
  'ranking',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    name: text().notNull(),
    year: integer().notNull(),
    ranking: text().notNull(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityId, table.name, table.year)],
).enableRLS();

export { ranking };
