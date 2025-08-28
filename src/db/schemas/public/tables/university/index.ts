import { sql } from 'drizzle-orm';
import {
  check,
  date,
  integer,
  numeric,
  pgTable,
  text,
  varchar,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';

import { country } from '../country';

const university = pgTable(
  'university',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    uapplyId: integer(),
    name: text().notNull(),
    japaneseName: text().notNull(),
    code: varchar({ length: 3 }).notNull().unique(),
    slug: text().notNull().unique(),
    countryCode: varchar({ length: 2 })
      .notNull()
      .references(() => country.code),
    mainUniversityId: integer()
      .notNull()
      .references((): AnyPgColumn => university.id),
    nonApplicableCountryCode: varchar({ length: 2 }).references(
      () => country.code,
    ),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    score: integer().notNull(),
    imgVersion: integer().notNull(),
    latitude: numeric({ precision: 19, scale: 16 }).notNull(),
    longitude: numeric({ precision: 19, scale: 16 }).notNull(),
    foundingYear: integer().notNull(),
    management: text().notNull(),
    students: integer().notNull(),
    internationalStudents: integer().notNull(),
    ksp: text().notNull(),
    url: text().notNull(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [check('check_score', sql`${table.score} BETWEEN 0 AND 100`)],
).enableRLS();

export { university };
