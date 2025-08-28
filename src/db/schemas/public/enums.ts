import { pgEnum } from 'drizzle-orm/pg-core';

const academicYearEnum = pgEnum('academic_year', [
  '2425',
  '2526',
  '2627',
  '2728',
  '2829',
  '2930',
  '3031',
  '3132',
  '3233',
  '3334',
  '3435',
]);

const durationUnitEnum = pgEnum('duration_unit', [
  'month',
  'semester',
  'term',
  'week',
  'year',
]);

const providerTypeEnum = pgEnum('provider_type', [
  'direct',
  'master',
  'provider',
]);

const rankingScopeEnum = pgEnum('ranking_scope', [
  'world',
  'national',
  'university',
  'major',
]);

const scholarshipTypeEnum = pgEnum('scholarship_type', [
  'base',
  'early',
  'special',
]);

const studyLevelEnum = pgEnum('study_level', [
  'undergraduate',
  'taught',
  'research',
]);

export {
  academicYearEnum,
  durationUnitEnum,
  providerTypeEnum,
  rankingScopeEnum,
  scholarshipTypeEnum,
  studyLevelEnum,
};
