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

import { timestamps } from '../../../../../utils/timestamps';
import { program } from '../../program';

const programNavi = pgTable(
  'program_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    programId: integer()
      .primaryKey()
      .references(() => program.id),
    id: integer().notNull().unique(),
    kspEn: text(),
    ksp: text().notNull(),
    scholarshipKsp: text(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }),
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
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    check(
      'check_requirement_range',
      sql`
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

export { programNavi };
