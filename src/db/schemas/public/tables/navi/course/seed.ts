import {
  stringToNumber,
  stringToStringOrNull,
} from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { courseNavi as t } from '.';

class CourseNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    const id =
      row.id === '' ?
        20_000 + stringToNumber(row.courseId)
      : stringToNumber(row.id);

    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        courseId: stringToNumber(row.courseId),
        endDate: stringToStringOrNull(row.endDate),
        entryOther: stringToStringOrNull(row.entryOther),
        entryOtherJpn: stringToStringOrNull(row.entryOtherJpn),
        id,
      });
    });
  }
}

const courseNavi = new CourseNaviSeed(t);

export { courseNavi };
