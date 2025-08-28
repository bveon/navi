import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { studyArea } from '../study-area';
import { studySubarea } from '../study-subarea';

const studySubareaStudyArea = pgTable(
  'study_subarea_study_area',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    studySubareaId: integer()
      .notNull()
      .references(() => studySubarea.id),
    studyAreaId: integer()
      .notNull()
      .references(() => studyArea.id),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.studySubareaId, table.studyAreaId)],
).enableRLS();

export { studySubareaStudyArea };
