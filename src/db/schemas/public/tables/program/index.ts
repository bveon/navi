import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  integer,
  numeric,
  pgTable,
  text,
} from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { programTypeInstance } from '../program-type-instance';
import { provider } from '../provider';

const program = pgTable(
  'program',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull(),
    programTypeInstanceId: integer()
      .notNull()
      .references(() => programTypeInstance.id),
    providerId: integer()
      .notNull()
      .references(() => provider.id),
    cricosCode: text(),
    ielts: numeric({ precision: 2, scale: 1 }),
    ieltsReading: numeric({ precision: 2, scale: 1 }),
    ieltsWriting: numeric({ precision: 2, scale: 1 }),
    ieltsListening: numeric({ precision: 2, scale: 1 }),
    ieltsSpeaking: numeric({ precision: 2, scale: 1 }),
    toefl: integer(),
    toeflReading: integer(),
    toeflWriting: integer(),
    toeflListening: integer(),
    toeflSpeaking: integer(),
    duolingo: integer(),
    duolingoReading: integer(),
    duolingoWriting: integer(),
    duolingoListening: integer(),
    duolingoSpeaking: integer(),
    hasCapacity: boolean().notNull(),
    isCapacity: boolean().notNull(),
    isActive: boolean().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    check(
      'check_duolingo_score',
      sql`
        (${table.duolingo} IS NULL OR ${table.duolingo} BETWEEN 10 AND 160) AND
        (${table.duolingoReading} IS NULL OR ${table.duolingoReading} BETWEEN 10 AND 160) AND
        (${table.duolingoListening} IS NULL OR ${table.duolingoListening} BETWEEN 10 AND 160) AND
        (${table.duolingoWriting} IS NULL OR ${table.duolingoWriting} BETWEEN 10 AND 160) AND
        (${table.duolingoSpeaking} IS NULL OR ${table.duolingoSpeaking} BETWEEN 10 AND 160)
        `,
    ),
    check(
      'check_ielts_score',
      sql`
        (${table.ielts} IS NULL OR (${table.ielts} BETWEEN 0 AND 9 AND ${table.ielts} % 0.5 = 0)) AND
        (${table.ieltsReading} IS NULL OR (${table.ieltsReading} BETWEEN 0 AND 9 AND ${table.ieltsReading} % 0.5 = 0)) AND
        (${table.ieltsListening} IS NULL OR (${table.ieltsListening} BETWEEN 0 AND 9 AND ${table.ieltsListening} % 0.5 = 0)) AND
        (${table.ieltsWriting} IS NULL OR (${table.ieltsWriting} BETWEEN 0 AND 9 AND ${table.ieltsWriting} % 0.5 = 0)) AND
        (${table.ieltsSpeaking} IS NULL OR (${table.ieltsSpeaking} BETWEEN 0 AND 9 AND ${table.ieltsSpeaking} % 0.5 = 0))
        `,
    ),
    check(
      'check_toefl_score',
      sql`
        (${table.toefl} IS NULL OR ${table.toefl} BETWEEN 0 AND 120) AND
        (${table.toeflReading} IS NULL OR ${table.toeflReading} BETWEEN 0 AND 30) AND
        (${table.toeflListening} IS NULL OR ${table.toeflListening} BETWEEN 0 AND 30) AND
        (${table.toeflWriting} IS NULL OR ${table.toeflWriting} BETWEEN 0 AND 30) AND
        (${table.toeflSpeaking} IS NULL OR ${table.toeflSpeaking} BETWEEN 0 AND 30)
        `,
    ),
  ],
).enableRLS();

export { program };
