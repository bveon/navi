import { integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const studyArea = pgTable(
  'study_area',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    tidName: integer().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { studyArea };
