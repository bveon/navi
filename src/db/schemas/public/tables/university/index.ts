import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  varchar,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { city } from '../city';

const university = pgTable(
  'university',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    primaryUniversityId: integer()
      .notNull()
      .references((): AnyPgColumn => university.id),
    code: varchar({ length: 3 }).notNull().unique(),
    slug: text().notNull().unique(),
    cityId: integer()
      .notNull()
      .references(() => city.id),
    latitude: numeric({ precision: 19, scale: 16 }).notNull(),
    longitude: numeric({ precision: 19, scale: 16 }).notNull(),
    foundingYear: integer().notNull(),
    students: integer().notNull(),
    internationalStudents: integer().notNull(),
    url: text().notNull(),
    isActive: boolean().notNull(),
    tidName: integer().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { university };
