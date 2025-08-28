import { sql } from 'drizzle-orm';
import { check, integer, pgTable, unique } from 'drizzle-orm/pg-core';

import { categoryTag } from '../category-tag';
import { disciplineTag } from '../discipline-tag';

const categoryTagDisciplineTag = pgTable(
  'category_tag_discipline_tag',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    categoryTagId: integer()
      .notNull()
      .references(() => categoryTag.id),
    disciplineTagId: integer()
      .notNull()
      .references(() => disciplineTag.id),
    sort: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    unique().on(table.categoryTagId, table.disciplineTagId),
    check('check_sort', sql`${table.sort} BETWEEN 0 AND 100`),
  ],
).enableRLS();

export { categoryTagDisciplineTag };
