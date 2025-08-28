import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { degree } from '../../degree';
import { programType } from '../../program-type';

const degreeProgramYearBase = pgTable(
  'degree_program_year_base',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    degreeId: integer()
      .notNull()
      .references(() => degree.id),
    programTypeCode: varchar({ length: 3 })
      .notNull()
      .references(() => programType.code),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.degreeId, table.programTypeCode)],
).enableRLS();

export { degreeProgramYearBase };
