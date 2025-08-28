import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { countryNavi as t } from '.';

class CountryNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        sort: stringToNumber(row.sort),
      });
    });
  }
}

const countryNavi = new CountryNaviSeed(t);

export { countryNavi };
