import {
  stringToNumber,
  stringToNumberOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { degree as t } from '.';

class DegreeSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        tidDescription: stringToNumberOrNull(row.tidDescription),
      });
    });
  }
}

const degree = new DegreeSeed(t);

export { degree };
