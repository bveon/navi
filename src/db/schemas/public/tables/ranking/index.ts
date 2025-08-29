import { boolean, integer, pgTable, text, unique } from 'drizzle-orm/pg-core';

import { university } from '../university';

const ranking = pgTable(
  'ranking',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    year: integer().notNull(),
    ranking: text().notNull(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    displayFlg: boolean().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityId, table.name, table.year)],
).enableRLS();

export { ranking };
