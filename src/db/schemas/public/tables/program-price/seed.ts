import { stringToEnum, stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { academicYearEnum } from '../../enums';

import { programPrice as t } from '.';

class ProgramPriceSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        academicYear: stringToEnum(
          row.academicYear,
          academicYearEnum.enumValues,
        ),
        price: stringToNumber(row.price),
        programId: stringToNumber(row.programId),
      });
    });
  }
}

const programPrice = new ProgramPriceSeed(t);

export { programPrice };
