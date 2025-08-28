import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { university } from '../university';
import { universityType } from '../university-type';

const universityUniversityType = pgTable(
  'university_university_type',
  {
    universityId: integer()
      .notNull()
      .references(() => university.id),
    universityTypeId: integer()
      .notNull()
      .references(() => universityType.id),
    ...timestamps,
  },
  (table) => [
    primaryKey({
      columns: [table.universityId, table.universityTypeId],
    }),
  ],
).enableRLS();

export { universityUniversityType };
