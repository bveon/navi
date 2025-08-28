import { sql } from 'drizzle-orm';
import { check, integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { studyArea } from '../../study-area';

const studyAreaNavi = pgTable(
  'study_area_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    studyAreaId: integer()
      .primaryKey()
      .references(() => studyArea.id),
    sort: integer().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`)],
).enableRLS();

export { studyAreaNavi };
