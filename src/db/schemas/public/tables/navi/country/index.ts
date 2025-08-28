import { sql } from 'drizzle-orm';
import { check, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { country } from '../../country';
import { currency } from '../../currency';

const countryNavi = pgTable(
  'country_navi',
  {
    countryIso3166Code: varchar({ length: 2 })
      .primaryKey()
      .references(() => country.iso3166Code),
    currencyIso4217Code: varchar({ length: 3 })
      .notNull()
      .references(() => currency.iso4217Code),
    sort: integer().notNull(),
    ...timestamps,
  },
  (table) => [check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`)],
).enableRLS();

export { countryNavi };
