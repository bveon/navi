import { sql } from 'drizzle-orm';
import { check, integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { studySubareaStudyArea } from '../../study-subarea-study-area';

const studySubareaStudyAreaNavi = pgTable(
  'study_subarea_study_area_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    studySubareaStudyAreaId: integer()
      .primaryKey()
      .references(() => studySubareaStudyArea.id),
    sort: integer().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`)],
).enableRLS();

export { studySubareaStudyAreaNavi };
