import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { academicYearEnum } from '../../enums';
import { currency } from '../currency';
import { program } from '../program';

const programPrice = pgTable(
  'program_price',
  /* eslint-disable perfectionist/sort-objects */
  {
    programId: integer()
      .notNull()
      .references(() => program.id),
    academicYear: academicYearEnum().notNull(),
    price: integer().notNull(),
    currencyIso4217Code: varchar({ length: 3 })
      .notNull()
      .references(() => currency.iso4217Code),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    primaryKey({
      columns: [table.programId, table.academicYear],
    }),
  ],
).enableRLS();

export { programPrice };
