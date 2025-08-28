import {
  stringToBoolean,
  stringToNumber,
  stringToStringOrNull,
} from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { programNavi as t } from '.';

class ProgramNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      const id =
        row.id === '' ?
          20_000 + stringToNumber(row.programId)
        : stringToNumber(row.id);

      resolve({
        ...row,
        ...timestampsDefaultValues,
        eatFlg: stringToBoolean(row.eatFlg),
        endDate: stringToStringOrNull(row.endDate),
        id,
        mathRequirement: stringToNumber(row.mathRequirement),
        otherRequirement: stringToBoolean(row.otherRequirement),
        programId: stringToNumber(row.programId),
        scholarshipKsp: stringToStringOrNull(row.scholarshipKsp),
        scienceRequirement: stringToNumber(row.scienceRequirement),
      });
    });
  }
}

const programNavi = new ProgramNaviSeed(t);

export { programNavi };
