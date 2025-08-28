import { stringToNumber } from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';

import { universityMajorDisciplineTagBase as t } from '.';

class UniversityMajorDisciplineTagBaseSeed extends Seed<
  typeof t,
  typeof t.$inferSelect
> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        disciplineTagId: stringToNumber(row.disciplineTagId),
        id: stringToNumber(row.id),
        universityMajorBaseId: stringToNumber(row.universityMajorBaseId),
      });
    });
  }
}

const universityMajorDisciplineTagBase =
  new UniversityMajorDisciplineTagBaseSeed(t);

export { universityMajorDisciplineTagBase };
