import {
  stringToBoolean,
  stringToNumber,
  stringToNumberOrNull,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { program as t } from '.';

class ProgramSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        cricosCode: stringToStringOrNull(row.cricosCode),
        duolingo: stringToNumberOrNull(row.duolingo),
        duolingoListening: stringToNumberOrNull(row.duolingoListening),
        duolingoReading: stringToNumberOrNull(row.duolingoReading),
        duolingoSpeaking: stringToNumberOrNull(row.duolingoSpeaking),
        duolingoWriting: stringToNumberOrNull(row.duolingoWriting),
        hasCapacity: stringToBoolean(row.hasCapacity),
        id: stringToNumber(row.id),
        ielts: stringToStringOrNull(row.ielts),
        ieltsListening: stringToStringOrNull(row.ieltsListening),
        ieltsReading: stringToStringOrNull(row.ieltsReading),
        ieltsSpeaking: stringToStringOrNull(row.ieltsSpeaking),
        ieltsWriting: stringToStringOrNull(row.ieltsWriting),
        isActive: stringToBoolean(row.isActive),
        isCapacity: stringToBoolean(row.isCapacity),
        programTypeInstanceId: stringToNumber(row.programTypeInstanceId),
        providerId: stringToNumber(row.providerId),
        tidDescription: stringToNumberOrNull(row.tidDescription),
        toefl: stringToNumberOrNull(row.toefl),
        toeflListening: stringToNumberOrNull(row.toeflListening),
        toeflReading: stringToNumberOrNull(row.toeflReading),
        toeflSpeaking: stringToNumberOrNull(row.toeflSpeaking),
        toeflWriting: stringToNumberOrNull(row.toeflWriting),
      });
    });
  }
}

const program = new ProgramSeed(t);

export { program };
