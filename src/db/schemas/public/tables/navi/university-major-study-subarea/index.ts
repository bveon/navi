import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { studySubarea } from '../../study-subarea';
import { universityMajorNavi } from '../university-major';

const universityMajorStudySubareaNavi = pgTable(
  'university_major_study_subarea_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityMajorNaviId: integer()
      .notNull()
      .references(() => universityMajorNavi.id),
    studySubareaId: integer()
      .notNull()
      .references(() => studySubarea.id),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityMajorNaviId, table.studySubareaId)],
).enableRLS();

export { universityMajorStudySubareaNavi };
