import {
  stringToNumber,
  stringToNumberOrNull,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { university as t } from '.';

class UniversitySeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        endDate: stringToStringOrNull(row.endDate),
        foundationYear: stringToNumber(row.foundationYear),
        id: stringToNumber(row.id),
        imgVersion: stringToNumber(row.imgVersion),
        internationalStudents: stringToNumber(row.internationalStudents),
        mainUniversityId: stringToNumber(row.mainUniversityId),
        nonApplicableNationalCode: stringToStringOrNull(
          row.nonApplicableNationalCode,
        ),
        score: stringToNumber(row.score),
        students: stringToNumber(row.students),
        uApplyId: stringToNumberOrNull(row.uApplyId),
      });
    });
  }
}

const university = new UniversitySeed(t);

export { university };
