import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { course } from '../../course';

const courseNavi = pgTable(
  'course_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    courseId: integer()
      .primaryKey()
      .references(() => course.id),
    id: integer().notNull().unique(),
    intakes: text().notNull(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    entryOther: text(),
    entryOtherJpn: text(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { courseNavi };
