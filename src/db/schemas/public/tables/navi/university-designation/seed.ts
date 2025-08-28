import {
  stringToNumber,
  stringToStringOrNull,
} from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { universityDesignationNavi as t } from '.';

class UniversityDesignationNaviSeed extends Seed<
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
        iconUrl: stringToStringOrNull(row.iconUrl),
        universityDesignationId: stringToNumber(row.universityDesignationId),
      });
    });
  }
}

const universityDesignationNavi = new UniversityDesignationNaviSeed(t);

export { universityDesignationNavi };
