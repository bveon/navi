import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { disciplineTag } from '../discipline-tag';
import { major } from '../major';

const majorDisciplineTag = pgTable(
  'major_discipline_tag',
  /* eslint-disable perfectionist/sort-objects */
  {
    majorId: integer()
      .notNull()
      .references(() => major.id),
    disciplineTagId: integer()
      .notNull()
      .references(() => disciplineTag.id),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    primaryKey({
      columns: [table.majorId, table.disciplineTagId],
    }),
  ],
).enableRLS();

export { majorDisciplineTag };
