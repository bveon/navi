import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';

import { programTypeInstance as t } from '.';

class ProgramTypeInstanceSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        courseOffset: stringToNumber(row.courseOffset),
        duration: stringToNumber(row.duration),
        id: stringToNumber(row.id),
      });
    });
  }
}

const programTypeInstance = new ProgramTypeInstanceSeed(t);

export { programTypeInstance };
