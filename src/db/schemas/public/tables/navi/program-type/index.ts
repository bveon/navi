import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { programType } from '../../program-type';

const programTypeNavi = pgTable(
  'program_type_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    programTypeCode: varchar({ length: 3 })
      .notNull()
      .references(() => programType.code),
    code: varchar({ length: 3 }).notNull().unique(),
    abbreviation: text().notNull(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { programTypeNavi };
