import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { universityMajorNavi as t } from '.';

class UniversityMajorNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        majorId: stringToNumber(row.majorId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const universityMajorNavi = new UniversityMajorNaviSeed(t);

export { universityMajorNavi };
