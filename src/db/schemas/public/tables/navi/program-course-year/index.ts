import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { courseNavi } from '../course';
import { programTypeNavi } from '../program-type';

const programCourseYearNavi = pgTable(
  'program_course_year_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    courseNaviId: integer()
      .notNull()
      .references(() => courseNavi.id),
    programTypeNaviCode: varchar({ length: 3 })
      .notNull()
      .references(() => programTypeNavi.code),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.courseNaviId, table.programTypeNaviCode)],
).enableRLS();

export { programCourseYearNavi };
