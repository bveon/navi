import {
  stringToBoolean,
  stringToNumber,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { degree as t } from '.';

class CourseSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        awardId: stringToNumber(row.awardId),
        concentration: stringToStringOrNull(row.concentration),
        cricosCode: stringToStringOrNull(row.cricosCode),
        durationPg: stringToNumber(row.durationPg),
        durationUg: stringToNumber(row.durationUg),
        entryOther: stringToStringOrNull(row.entryOther),
        entryOtherJpn: stringToStringOrNull(row.entryOtherJpn),
        honors: stringToBoolean(row.honors),
        id: stringToNumber(row.id),
        majorId: stringToNumber(row.majorId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const course = new CourseSeed(t);

export { course };
