import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { degree } from '../../degree';
import { programType } from '../../program-type';

const programCourseYearBase = pgTable(
  'program_course_year_base',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    degreeId: integer()
      .notNull()
      .references(() => degree.id),
    programTypeId: integer()
      .notNull()
      .references(() => programType.id),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.degreeId, table.programTypeId)],
).enableRLS();

export { programCourseYearBase };
