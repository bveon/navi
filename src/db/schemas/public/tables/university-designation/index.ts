import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { designation } from '../designation';
import { university } from '../university';

const universityDesignation = pgTable(
  'university_designation',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    designationId: integer()
      .notNull()
      .references(() => designation.id),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityId, table.designationId)],
).enableRLS();

export { universityDesignation };
