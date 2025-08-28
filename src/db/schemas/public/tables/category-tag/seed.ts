import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { categoryTag as t } from '.';

class CategoryTagSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        id: stringToNumber(row.id),
        sort: stringToNumber(row.sort),
      });
    });
  }
}

const categoryTag = new CategoryTagSeed(t);

export { categoryTag };
