import { stringToNumberOrNull } from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';

import { rankingBody as t } from '.';

class RankingBodySeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        tidDescription: stringToNumberOrNull(row.tidDescription),
      });
    });
  }
}

const rankingBody = new RankingBodySeed(t);

export { rankingBody };
