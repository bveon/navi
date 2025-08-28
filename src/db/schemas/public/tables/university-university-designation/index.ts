import { boolean, integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { university } from '../university';
import { universityDesignation } from '../university-designation';

const universityUniversityDesignation = pgTable(
  'university_university_designation',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    universityDesignationId: integer()
      .notNull()
      .references(() => universityDesignation.id),
    isActive: boolean().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityId, table.universityDesignationId)],
).enableRLS();

export { universityUniversityDesignation };
