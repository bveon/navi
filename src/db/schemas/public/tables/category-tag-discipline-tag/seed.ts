import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { categoryTagDisciplineTag as t } from '.';

class CategoryTagDisciplineTagSeed extends Seed<
  typeof t,
  typeof t.$inferSelect
> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        categoryTagId: stringToNumber(row.categoryTagId),
        deleteFlg: stringToNumber(row.deleteFlg),
        disciplineTagId: stringToNumber(row.disciplineTagId),
        id: stringToNumber(row.id),
        sort: stringToNumber(row.sort),
      });
    });
  }
}

const categoryTagDisciplineTag = new CategoryTagDisciplineTagSeed(t);

export { categoryTagDisciplineTag };
