import { stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { programScholarship as t } from '.';

class ProgramScholarshipSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        programId: stringToNumber(row.programId),
        scholarshipId: stringToNumber(row.scholarshipId),
      });
    });
  }
}

const programScholarship = new ProgramScholarshipSeed(t);

export { programScholarship };
