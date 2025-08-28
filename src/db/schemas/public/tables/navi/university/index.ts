import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  integer,
  pgTable,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { country } from '../../country';
import { university } from '../../university';

const universityNavi = pgTable(
  'university_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    universityId: integer()
      .primaryKey()
      .references(() => university.id),
    id: integer().notNull().unique(),
    uapplyId: integer(),
    slug: text().notNull().unique(),
    nonApplicableCountryCode: varchar({ length: 2 }).references(
      () => country.iso3166Code,
    ),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    score: integer().notNull(),
    imgVersion: integer().notNull(),
    isActive: boolean().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_score', sql`${table.score} BETWEEN 0 AND 100`)],
).enableRLS();

export { universityNavi };
