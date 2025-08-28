import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  integer,
  numeric,
  pgTable,
  text,
} from 'drizzle-orm/pg-core';

import { programType } from '../program-type';

const program = pgTable(
  'program',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    name: text().notNull(),
    programType: integer()
      .notNull()
      .references(() => programType.id),
    kspEn: text().notNull(),
    ksp: text().notNull(),
    scholarshipKspEn: text(),
    scholarshipKsp: text(),
    provider: text().notNull(),
    cricosCode: text(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    tuition: integer().notNull(),
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
    gpa: numeric({ precision: 5, scale: 2 }).notNull(),
    gpaSub: text(),
    gpaSubJpn: text(),
    entryOther: text(),
    entryOtherJpn: text(),
    mathRequirement: integer().notNull(),
    math1: numeric('math_1', { precision: 5, scale: 2 }).notNull(),
    mathA: numeric({ precision: 5, scale: 2 }).notNull(),
    math2: numeric('math_2', { precision: 5, scale: 2 }).notNull(),
    mathB: numeric({ precision: 5, scale: 2 }).notNull(),
    math3: numeric('math_3', { precision: 5, scale: 2 }).notNull(),
    mathC: numeric({ precision: 5, scale: 2 }).notNull(),
    mathAvg: numeric({ precision: 5, scale: 2 }).notNull(),
    scienceRequirement: integer().notNull(),
    physics: numeric({ precision: 5, scale: 2 }).notNull(),
    biology: numeric({ precision: 5, scale: 2 }).notNull(),
    chemistry: numeric({ precision: 5, scale: 2 }).notNull(),
    scienceAvg: numeric({ precision: 5, scale: 2 }).notNull(),
    otherRequirement: boolean().notNull(),
    eatFlg: boolean().notNull(),
    capacityFlg: boolean().notNull(),
    deleteFlg: integer().notNull(),
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
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
    check(
      'check_requirement_range',
      sql`
        ${table.gpa} = 0 OR ${table.gpa} BETWEEN 1 AND 5 AND
        ${table.math1} = 0 OR ${table.math1} BETWEEN 1 AND 5 AND
        ${table.mathA} = 0 OR ${table.mathA} BETWEEN 1 AND 5 AND
        ${table.math2} = 0 OR ${table.math2} BETWEEN 1 AND 5 AND
        ${table.mathB} = 0 OR ${table.mathB} BETWEEN 1 AND 5 AND
        ${table.math3} = 0 OR ${table.math3} BETWEEN 1 AND 5 AND
        ${table.mathC} = 0 OR ${table.mathC} BETWEEN 1 AND 5 AND
        ${table.mathAvg} = 0 OR ${table.mathAvg} BETWEEN 1 AND 5 AND
        ${table.physics} = 0 OR ${table.physics} BETWEEN 1 AND 5 AND
        ${table.biology} = 0 OR ${table.biology} BETWEEN 1 AND 5 AND
        ${table.chemistry} = 0 OR ${table.chemistry} BETWEEN 1 AND 5 AND
        ${table.scienceAvg} = 0 OR ${table.scienceAvg} BETWEEN 1 AND 5
        `,
    ),
  ],
).enableRLS();

export { program };
