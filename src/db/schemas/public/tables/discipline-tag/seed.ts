import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { disciplineTag as t } from '.';

class DisciplineTagSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        id: stringToNumber(row.id),
      });
    });
  }
}

const disciplineTag = new DisciplineTagSeed(t);

export { disciplineTag };
