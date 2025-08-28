import { boolean, integer, pgTable, text, unique } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { studyLevelEnum } from '../../enums';
import { degree } from '../degree';
import { major } from '../major';
import { university } from '../university';

const course = pgTable(
  'course',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    degreeId: integer()
      .notNull()
      .references(() => degree.id),
    majorId: integer()
      .notNull()
      .references(() => major.id),
    concentration: text(),
    honors: boolean().notNull(),
    studyLevel: studyLevelEnum().notNull(),
    durationUg: integer().notNull(),
    durationPg: integer().notNull(),
    isStudyAbroadIncluded: boolean().notNull(),
    isStudyAbroadOptional: boolean().notNull(),
    isIndustryIncluded: boolean().notNull(),
    isIndustryOptional: boolean().notNull(),
    cricosCode: text(),
    isActive: boolean().notNull(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    unique().on(
      table.universityId,
      table.degreeId,
      table.majorId,
      table.concentration,
      table.honors,
      table.studyLevel,
    ),
  ],
).enableRLS();

export { course };
