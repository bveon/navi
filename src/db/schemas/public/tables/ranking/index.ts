import {
  boolean,
  integer,
  pgTable,
  text,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../utils/timestamps';
import { rankingScopeEnum } from '../../enums';
import { rankingBody } from '../ranking-body';
import { university } from '../university';

const ranking = pgTable(
  'ranking',
  /* eslint-disable perfectionist/sort-objects */
  {
    id: integer().primaryKey(),
    universityId: integer()
      .notNull()
      .references(() => university.id),
    rankingBodyCode: varchar({ length: 20 })
      .notNull()
      .references(() => rankingBody.code),
    scope: rankingScopeEnum().notNull(),
    field: text(),
    year: integer().notNull(),
    min: integer().notNull(),
    max: integer().notNull().default(0),
    isActive: boolean().notNull().default(false),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
  (table) => [
    unique().on(
      table.universityId,
      table.rankingBodyCode,
      table.scope,
      table.field,
      table.year,
    ),
  ],
).enableRLS();

export { ranking };
