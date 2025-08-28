import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { studySubareaStudyArea as t } from '.';

class StudySubareaStudyAreaSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        studyAreaId: stringToNumber(row.studyAreaId),
        studySubareaId: stringToNumber(row.studySubareaId),
      });
    });
  }
}

const studySubareaStudyArea = new StudySubareaStudyAreaSeed(t);

export { studySubareaStudyArea };
