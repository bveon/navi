import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { programType } from '../program-type';

const programTypeInstance = pgTable(
  'program_type_instance',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    programTypeCode: varchar({ length: 3 })
      .notNull()
      .references(() => programType.code),
    duration: integer().notNull(),
    courseOffset: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { programTypeInstance };
