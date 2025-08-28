import { integer, pgTable } from 'drizzle-orm/pg-core';

import { major } from '../../major';
import { university } from '../../university';

const universityMajorBase = pgTable(
  'university_major_base',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    majorId: integer()
      .notNull()
      .references(() => major.id),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { universityMajorBase };
