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
        cricosCode: stringToStringOrNull(row.cricosCode),
        deleteFlg: stringToNumber(row.deleteFlg),
        eatFlg: stringToBoolean(row.eatFlg),
        id: stringToNumber(row.id),
        ielts: stringToStringOrNull(row.ielts),
        ieltsListening: stringToStringOrNull(row.ieltsListening),
        ieltsReading: stringToStringOrNull(row.ieltsReading),
        ieltsSpeaking: stringToStringOrNull(row.ieltsSpeaking),
        ieltsWriting: stringToStringOrNull(row.ieltsWriting),
        mathRequirement: stringToNumber(row.mathRequirement),
        otherRequirement: stringToBoolean(row.otherRequirement),
        programType: stringToNumber(row.programType),
        scienceRequirement: stringToNumber(row.scienceRequirement),
        toefl: stringToNumberOrNull(row.toefl),
        toeflListening: stringToNumberOrNull(row.toeflListening),
        toeflReading: stringToNumberOrNull(row.toeflReading),
        toeflSpeaking: stringToNumberOrNull(row.toeflSpeaking),
        toeflWriting: stringToNumberOrNull(row.toeflWriting),
        tuition: stringToNumber(row.tuition),
      });
    });
  }
}

const program = new ProgramSeed(t);

export { program };
