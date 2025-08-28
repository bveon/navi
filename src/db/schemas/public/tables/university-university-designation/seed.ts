import { stringToBoolean, stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { universityUniversityDesignation as t } from '.';

class UniversityUniversityDesignationSeed extends Seed<
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
        isActive: stringToBoolean(row.isActive),
        universityDesignationId: stringToNumber(row.universityDesignationId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const universityUniversityDesignation = new UniversityUniversityDesignationSeed(
  t,
);

export { universityUniversityDesignation };
