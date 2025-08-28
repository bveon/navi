import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { degree } from '../degree';
import { program } from '../program';

const programDegree = pgTable(
  'program_degree',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    programId: integer()
      .notNull()
      .references(() => program.id),
    degreeId: integer()
      .notNull()
      .references(() => degree.id),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.programId, table.degreeId)],
).enableRLS();

export { programDegree };
