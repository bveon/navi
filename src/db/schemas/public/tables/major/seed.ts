import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { major as t } from '.';

class MajorSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        id: stringToNumber(row.id),
      });
    });
  }
}

const major = new MajorSeed(t);

export { major };
