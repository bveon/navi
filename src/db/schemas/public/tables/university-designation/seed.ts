import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { universityDesignation as t } from '.';

class UniversityDesignationSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        deleteFlg: stringToNumber(row.deleteFlg),
        designationId: stringToNumber(row.designationId),
        id: stringToNumber(row.id),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const universityDesignation = new UniversityDesignationSeed(t);

export { universityDesignation };
