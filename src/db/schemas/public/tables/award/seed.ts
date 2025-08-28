import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { award as t } from '.';

class AwardSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        id: stringToNumber(row.id),
      });
    });
  }
}

const award = new AwardSeed(t);

export { award };
