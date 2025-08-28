import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const major = pgTable('major', {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
}).enableRLS();

export { major };
