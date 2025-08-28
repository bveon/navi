import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { majorDisciplineTag as t } from '.';

class MajorDisciplineTagSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        disciplineTagId: stringToNumber(row.disciplineTagId),
        majorId: stringToNumber(row.majorId),
      });
    });
  }
}

const majorDisciplineTag = new MajorDisciplineTagSeed(t);

export { majorDisciplineTag };
