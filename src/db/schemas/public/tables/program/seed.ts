import {
  stringToBoolean,
  stringToNumber,
  stringToNumberOrNull,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { program as t } from '.';

class ProgramSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        capacityFlg: stringToBoolean(row.capacityFlg),
        cricos: stringToStringOrNull(row.cricos),
        deleteFlg: stringToNumber(row.deleteFlg),
        eatFlg: stringToBoolean(row.eatFlg),
        endDate: stringToStringOrNull(row.endDate),
        id: stringToNumber(row.id),
        ielts: stringToStringOrNull(row.ielts),
        ieltsL: stringToStringOrNull(row.ieltsL),
        ieltsR: stringToStringOrNull(row.ieltsR),
        ieltsS: stringToStringOrNull(row.ieltsS),
        ieltsW: stringToStringOrNull(row.ieltsW),
        mathRequirement: stringToNumber(row.mathRequirement),
        otherRequirement: stringToBoolean(row.otherRequirement),
        programTypeInstanceId: stringToNumber(row.programTypeInstanceId),
        scienceRequirement: stringToNumber(row.scienceRequirement),
        toefl: stringToNumberOrNull(row.toefl),
        toeflL: stringToNumberOrNull(row.toeflL),
        toeflR: stringToNumberOrNull(row.toeflR),
        toeflS: stringToNumberOrNull(row.toeflS),
        toeflW: stringToNumberOrNull(row.toeflW),
        tuition: stringToNumber(row.tuition),
      });
    });
  }
}

const program = new ProgramSeed(t);

export { program };
