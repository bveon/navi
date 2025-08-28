import { Seed } from '../../../../utils/seed';

import { programType as t } from '.';

class ProgramTypeSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
      });
    });
  }
}

const programType = new ProgramTypeSeed(t);

export { programType };
