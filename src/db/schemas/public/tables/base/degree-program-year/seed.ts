import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';

import { degreeProgramYearBase as t } from '.';

class DegreeProgramYearBaseSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        degreeId: stringToNumber(row.degreeId),
        id: stringToNumber(row.id),
      });
    });
  }
}

const degreeProgramYearBase = new DegreeProgramYearBaseSeed(t);

export { degreeProgramYearBase };
