import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const rankingBody = pgTable(
  'ranking_body',
  /* eslint-disable perfectionist/sort-objects */
  {
    code: varchar({ length: 20 }).primaryKey(),
    name: text().notNull(),
    abbreviation: text().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { rankingBody };
