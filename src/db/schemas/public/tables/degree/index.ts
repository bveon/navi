import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  unique,
} from 'drizzle-orm/pg-core';

import { award } from '../award';
import { major } from '../major';
import { university } from '../university';

const degree = pgTable(
  'degree',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    awardId: integer()
      .notNull()
      .references(() => award.id),
    majorId: integer()
      .notNull()
      .references(() => major.id),
    concentration: text(),
    hons: boolean().notNull(),
    durationUg: integer().notNull(),
    durationPg: integer().notNull(),
    cricos: text(),
    intakes: text().notNull(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    entryOther: text(),
    entryOtherJpn: text(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    unique().on(
      table.universityId,
      table.awardId,
      table.majorId,
      table.concentration,
      table.hons,
    ),
  ],
).enableRLS();

export { degree };
