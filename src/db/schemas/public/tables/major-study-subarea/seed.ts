import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { majorStudySubarea as t } from '.';

class MajorStudySubareaSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        majorId: stringToNumber(row.majorId),
        studySubareaId: stringToNumber(row.studySubareaId),
      });
    });
  }
}

const majorStudySubarea = new MajorStudySubareaSeed(t);

export { majorStudySubarea };
