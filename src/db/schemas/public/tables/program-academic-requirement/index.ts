import { integer, numeric, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { countryGpaScale } from '../country-gpa-scale';
import { program } from '../program';

const programAcademicRequirement = pgTable(
  'program_academic_requirement',
  /* eslint-disable perfectionist/sort-objects */
  {
    programId: integer()
      .notNull()
      .references(() => program.id),
    countryGpaScaleId: integer()
      .notNull()
      .references(() => countryGpaScale.id),
    gpa: numeric({ precision: 5, scale: 2 }).notNull(),
    tidCourseRequirements: integer(),
    tidOtherRequirements: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    primaryKey({
      columns: [table.programId, table.countryGpaScaleId],
    }),
  ],
).enableRLS();

export { programAcademicRequirement };
