import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../../../../../utils/timestamps';
import { scholarship } from '../../scholarship';

const scholarshipNavi = pgTable(
  'scholarship_navi',
  /* eslint-disable perfectionist/sort-objects */
  {
    scholarshipId: integer()
      .primaryKey()
      .references(() => scholarship.id),
    scholarshipKspEn: text(),
    scholarshipKsp: text(),
    ...timestamps,
  },
  /* eslint-enable perfectionist/sort-objects */
).enableRLS();

export { scholarshipNavi };
