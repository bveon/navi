import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';

const major = pgTable('major', {
  id: integer().primaryKey(),
  name: text().notNull().unique(),
  tidDescription: integer(),
  ...timestamps,
}).enableRLS();

export { major };
