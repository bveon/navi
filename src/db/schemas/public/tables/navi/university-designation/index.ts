import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { universityDesignation } from '../../university-designation';

const universityDesignationNavi = pgTable(
  'university_designation_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    universityDesignationId: integer()
      .primaryKey()
      .references(() => universityDesignation.id),
    iconUrl: text(),
    aCode: text().notNull().unique(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { universityDesignationNavi };
