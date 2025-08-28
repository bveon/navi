import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { universityUniversityType as t } from '.';

class UniversityUniversityTypeSeed extends Seed<
  typeof t,
  typeof t.$inferSelect
> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        universityId: stringToNumber(row.universityId),
        universityTypeId: stringToNumber(row.universityTypeId),
      });
    });
  }
}

const universityUniversityType = new UniversityUniversityTypeSeed(t);

export { universityUniversityType };
