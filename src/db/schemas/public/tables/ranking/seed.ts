import {
  stringToBoolean,
  stringToEnum,
  stringToNumber,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { rankingScopeEnum } from '../../enums';

import { ranking as t } from '.';

class RankingSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        isActive: stringToBoolean(row.isActive),
        max: stringToNumber(row.max),
        min: stringToNumber(row.min),
        scope: stringToEnum(row.scope, rankingScopeEnum.enumValues),
        universityId: stringToNumber(row.universityId),
        year: stringToNumber(row.year),
      });
    });
  }
}

const ranking = new RankingSeed(t);

export { ranking };
