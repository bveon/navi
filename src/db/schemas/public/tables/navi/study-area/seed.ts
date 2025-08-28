import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { studyAreaNavi as t } from '.';

class StudyAreaNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        sort: stringToNumber(row.sort),
        studyAreaId: stringToNumber(row.studyAreaId),
      });
    });
  }
}

const studyAreaNavi = new StudyAreaNaviSeed(t);

export { studyAreaNavi };
