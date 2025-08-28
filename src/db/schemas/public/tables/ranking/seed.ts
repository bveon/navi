import { stringToBoolean, stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { ranking as t } from '.';

class RankingSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        displayFlg: stringToBoolean(row.displayFlg),
        id: stringToNumber(row.id),
        universityId: stringToNumber(row.universityId),
        year: stringToNumber(row.year),
      });
    });
  }
}

const ranking = new RankingSeed(t);

export { ranking };
