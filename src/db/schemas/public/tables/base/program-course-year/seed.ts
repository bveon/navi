import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';

import { programCourseYearBase as t } from '.';

class ProgramCourseYearNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        degreeId: stringToNumber(row.degreeId),
        id: stringToNumber(row.id),
        programTypeId: stringToNumber(row.programTypeId),
      });
    });
  }
}

const programCourseYearNavi = new ProgramCourseYearNaviSeed(t);

export { programCourseYearNavi };
