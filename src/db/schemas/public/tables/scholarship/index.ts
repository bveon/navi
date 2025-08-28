import { boolean, date, integer, pgTable } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { durationUnitEnum, scholarshipTypeEnum } from '../../enums';

const scholarship = pgTable(
  'scholarship',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    startDate: date({ mode: 'string' }).notNull(),
    endDate: date({ mode: 'string' }).notNull(),
    min: integer(),
    max: integer().notNull(),
    duration: integer().notNull(),
    durationUnit: durationUnitEnum().notNull(),
    type: scholarshipTypeEnum().notNull(),
    hasCapacity: boolean().notNull(),
    isCapacity: boolean().notNull(),
    isActive: boolean().notNull(),
    tidName: integer().notNull(),
    tidRequirements: integer(),
    tidDescription: integer(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { scholarship };
