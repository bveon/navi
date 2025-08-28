import {
  stringToNumber,
  stringToNumberOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { universityType as t } from '.';

class UniversityTypeSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        tidDescription: stringToNumberOrNull(row.tidDescription),
        tidName: stringToNumber(row.tidName),
      });
    });
  }
}

const universityType = new UniversityTypeSeed(t);

export { universityType };
