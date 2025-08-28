import { boolean, integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { course } from '../course';
import { program } from '../program';

const programCourse = pgTable(
  'program_course',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    programId: integer()
      .notNull()
      .references(() => program.id),
    courseId: integer()
      .notNull()
      .references(() => course.id),
    isActive: boolean().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.programId, table.courseId)],
).enableRLS();

export { programCourse };
