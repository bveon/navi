import { integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { disciplineTag } from '../../discipline-tag';
import { universityMajorBase } from '../university-major';

const universityMajorDisciplineTagBase = pgTable(
  'university_major_discipline_tag_base',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityMajorBaseId: integer()
      .notNull()
      .references(() => universityMajorBase.id),
    disciplineTagId: integer()
      .notNull()
      .references(() => disciplineTag.id),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [unique().on(table.universityMajorBaseId, table.disciplineTagId)],
).enableRLS();

export { universityMajorDisciplineTagBase };
