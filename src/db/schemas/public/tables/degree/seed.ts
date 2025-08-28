import {
  stringToBoolean,
  stringToNumber,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { degree as t } from '.';

class DegreeSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        awardId: stringToNumber(row.awardId),
        concentration: stringToStringOrNull(row.concentration),
        cricos: stringToStringOrNull(row.cricos),
        deleteFlg: stringToNumber(row.deleteFlg),
        durationPg: stringToNumber(row.durationPg),
        durationUg: stringToNumber(row.durationUg),
        endDate: stringToStringOrNull(row.endDate),
        entryOther: stringToStringOrNull(row.entryOther),
        entryOtherJpn: stringToStringOrNull(row.entryOtherJpn),
        hons: stringToBoolean(row.hons),
        id: stringToNumber(row.id),
        majorId: stringToNumber(row.majorId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const degree = new DegreeSeed(t);

export { degree };
