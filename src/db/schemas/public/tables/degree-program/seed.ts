import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { degreeProgram as t } from '.';

class DegreeProgramSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        degreeId: stringToNumber(row.degreeId),
        deleteFlg: stringToNumber(row.deleteFlg),
        id: stringToNumber(row.id),
        programId: stringToNumber(row.programId),
      });
    });
  }
}

const degreeProgram = new DegreeProgramSeed(t);

export { degreeProgram };
