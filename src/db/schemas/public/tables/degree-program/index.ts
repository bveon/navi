import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { degree } from '../degree';
import { program } from '../program';

const degreeProgram = pgTable(
  'degree_program',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    degreeId: integer()
      .notNull()
      .references(() => degree.id),
    programId: integer()
      .notNull()
      .references(() => program.id),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.programId, table.degreeId)],
).enableRLS();

export { degreeProgram };
