import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';

const scholarship = pgTable(
  'scholarship',
  /* eslint-disable perfectionist/sort-objects */
  {
    deleteFlg: integer().notNull(),
    id: integer().primaryKey(),
    name: text().notNull(),
    scholarship: integer().notNull(),
    scholarshipKspEn: text(),
    scholarshipKsp: text(),
    scholarshipType: text().notNull(),
    displayStart: date({ mode: 'string' }),
    displayEnd: date({ mode: 'string' }),
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { scholarship };
