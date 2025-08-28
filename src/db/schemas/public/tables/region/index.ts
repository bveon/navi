import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { country } from '../country';

const region = pgTable(
  'region',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    countryIso3166Code: varchar({ length: 2 })
      .notNull()
      .references(() => country.iso3166Code),
    tidName: integer().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { region };
