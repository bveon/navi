import {
  stringToNumber,
  stringToNumberOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { programType as t } from '.';

class ProgramTypeSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        tidDescription: stringToNumberOrNull(row.tidDescription),
        tidName: stringToNumber(row.tidName),
      });
    });
  }
}

const programType = new ProgramTypeSeed(t);

export { programType };
