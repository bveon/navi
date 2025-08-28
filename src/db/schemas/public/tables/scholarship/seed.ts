import {
  stringToNumber,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { scholarship as t } from '.';

class ScholarshipSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        displayEnd: stringToStringOrNull(row.displayEnd),
        displayStart: stringToStringOrNull(row.displayStart),
        id: stringToNumber(row.id),
        scholarship: stringToNumber(row.scholarship),
        scholarshipKsp: stringToStringOrNull(row.scholarshipKsp),
        scholarshipKspEn: stringToStringOrNull(row.scholarshipKspEn),
      });
    });
  }
}

const scholarship = new ScholarshipSeed(t);

export { scholarship };
