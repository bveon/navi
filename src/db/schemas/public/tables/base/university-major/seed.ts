import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';

import { universityMajorBase as t } from '.';

class UniversityMajorBaseSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        id: stringToNumber(row.id),
        majorId: stringToNumber(row.majorId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const universityMajorBase = new UniversityMajorBaseSeed(t);

export { universityMajorBase };
