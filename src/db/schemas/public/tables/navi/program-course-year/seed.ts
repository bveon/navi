import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { programCourseYearNavi as t } from '.';

class ProgramCourseYearNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        courseNaviId: stringToNumber(row.courseNaviId),
        id: stringToNumber(row.id),
      });
    });
  }
}

const programCourseYearNavi = new ProgramCourseYearNaviSeed(t);

export { programCourseYearNavi };
