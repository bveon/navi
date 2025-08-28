import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { program } from '../program';
import { scholarship } from '../scholarship';

const programScholarship = pgTable(
  'program_scholarship',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    programId: integer()
      .notNull()
      .references(() => program.id),
    scholarshipId: integer()
      .notNull()
      .references(() => scholarship.id),
    capacityFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.programId, table.scholarshipId)],
).enableRLS();

export { programScholarship };
