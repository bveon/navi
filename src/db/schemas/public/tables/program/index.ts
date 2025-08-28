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

import { programTypeInstance } from '../program-type-instance';

const program = pgTable(
  'program',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    programTypeInstanceId: integer()
      .notNull()
      .references(() => programTypeInstance.id),
    kspEn: text().notNull(),
    ksp: text().notNull(),
    scholarshipKspEn: text(),
    scholarshipKsp: text(),
    provider: text().notNull(),
    cricos: text(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
    tuition: integer().notNull(),
    ielts: numeric({ precision: 2, scale: 1 }),
    ieltsR: numeric({ precision: 2, scale: 1 }),
    ieltsW: numeric({ precision: 2, scale: 1 }),
    ieltsL: numeric({ precision: 2, scale: 1 }),
    ieltsS: numeric({ precision: 2, scale: 1 }),
    toefl: integer(),
    toeflR: integer(),
    toeflW: integer(),
    toeflL: integer(),
    toeflS: integer(),
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
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    check(
      'check_ielts_score',
      sql`
        (${table.ielts} IS NULL OR (${table.ielts} BETWEEN 0 AND 9 AND ${table.ielts} % 0.5 = 0)) AND
        (${table.ieltsR} IS NULL OR (${table.ieltsR} BETWEEN 0 AND 9 AND ${table.ieltsR} % 0.5 = 0)) AND
        (${table.ieltsL} IS NULL OR (${table.ieltsL} BETWEEN 0 AND 9 AND ${table.ieltsL} % 0.5 = 0)) AND
        (${table.ieltsW} IS NULL OR (${table.ieltsW} BETWEEN 0 AND 9 AND ${table.ieltsW} % 0.5 = 0)) AND
        (${table.ieltsS} IS NULL OR (${table.ieltsS} BETWEEN 0 AND 9 AND ${table.ieltsS} % 0.5 = 0))
        `,
    ),
    check(
      'check_toefl_score',
      sql`
        (${table.toefl} IS NULL OR ${table.toefl} BETWEEN 0 AND 120) AND
        (${table.toeflR} IS NULL OR ${table.toeflR} BETWEEN 0 AND 30) AND
        (${table.toeflL} IS NULL OR ${table.toeflL} BETWEEN 0 AND 30) AND
        (${table.toeflW} IS NULL OR ${table.toeflW} BETWEEN 0 AND 30) AND
        (${table.toeflS} IS NULL OR ${table.toeflS} BETWEEN 0 AND 30)
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
