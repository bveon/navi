import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { program } from '../program';
import { scholarship } from '../scholarship';

const programScholarship = pgTable(
  'program_scholarship',
  {
    id: integer().primaryKey(),
    programId: integer()
      .notNull()
      .references(() => program.id),
    scholarshipId: integer()
      .notNull()
      .references(() => scholarship.id),
    ...timestamps,
  },
  (table) => [unique().on(table.programId, table.scholarshipId)],
).enableRLS();

export { programScholarship };
