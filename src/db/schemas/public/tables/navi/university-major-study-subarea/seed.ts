import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';

import { universityMajorStudySubareaNavi as t } from '.';

class UniversityMajorStudySubareaNaviSeed extends Seed<
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
        id: stringToNumber(row.id),
        studySubareaId: stringToNumber(row.studySubareaId),
        universityMajorNaviId: stringToNumber(row.universityMajorNaviId),
      });
    });
  }
}

const universityMajorStudySubareaNavi = new UniversityMajorStudySubareaNaviSeed(
  t,
);

export { universityMajorStudySubareaNavi };
