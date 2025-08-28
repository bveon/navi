import { integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const studySubarea = pgTable(
  'study_subarea',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    tidName: integer().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { studySubarea };
