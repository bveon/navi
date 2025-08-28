import { integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { major } from '../../major';
import { university } from '../../university';

const universityMajorNavi = pgTable(
  'university_major_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    majorId: integer()
      .notNull()
      .references(() => major.id),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { universityMajorNavi };
