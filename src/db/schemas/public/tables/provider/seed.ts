import { stringToEnum, stringToNumber } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { providerTypeEnum } from '../../enums';

import { provider as t } from '.';

class ProviderSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        id: stringToNumber(row.id),
        type: stringToEnum(row.type, providerTypeEnum.enumValues),
      });
    });
  }
}

const provider = new ProviderSeed(t);

export { provider };
