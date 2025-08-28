import {
  stringToNumber,
  stringToNumberOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { programAcademicRequirement as t } from '.';

class ProgramAcademicRequirementSeed extends Seed<
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
        countryGpaScaleId: stringToNumber(row.countryGpaScaleId),
        programId: stringToNumber(row.programId),
        tidCourseRequirements: stringToNumberOrNull(row.tidCourseRequirements),
        tidOtherRequirements: stringToNumberOrNull(row.tidOtherRequirements),
      });
    });
  }
}

const programAcademicRequirement = new ProgramAcademicRequirementSeed(t);

export { programAcademicRequirement };
