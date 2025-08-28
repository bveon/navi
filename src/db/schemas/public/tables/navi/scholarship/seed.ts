import {
  stringToNumber,
  stringToStringOrNull,
} from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { scholarshipNavi as t } from '.';

class ScholarshipNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        scholarshipId: stringToNumber(row.scholarshipId),
        scholarshipKsp: stringToStringOrNull(row.scholarshipKsp),
        scholarshipKspEn: stringToStringOrNull(row.scholarshipKspEn),
      });
    });
  }
}

const scholarshipNavi = new ScholarshipNaviSeed(t);

export { scholarshipNavi };
