import { stringToBoolean, stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { programCourse as t } from '.';

class ProgramCourseSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        courseId: stringToNumber(row.courseId),
        id: stringToNumber(row.id),
        isActive: stringToBoolean(row.isActive),
        programId: stringToNumber(row.programId),
      });
    });
  }
}

const programCourse = new ProgramCourseSeed(t);

export { programCourse };
