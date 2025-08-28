import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { major } from '../major';
import { studySubarea } from '../study-subarea';

const majorStudySubarea = pgTable(
  'major_study_subarea',
  {
    majorId: integer()
      .notNull()
      .references(() => major.id),
    studySubareaId: integer()
      .notNull()
      .references(() => studySubarea.id),
    ...timestamps,
  },
  (table) => [
    primaryKey({
      columns: [table.majorId, table.studySubareaId],
    }),
  ],
).enableRLS();

export { majorStudySubarea };
