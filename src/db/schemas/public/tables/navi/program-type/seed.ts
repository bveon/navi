import { eq } from 'drizzle-orm';

import { db } from '../../../../../index';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';
import { programType } from '../../program-type';

import { programTypeNavi as t } from '.';

class ProgramTypeNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    const [data] = await db
      .select({
        abbreviation: programType.abbreviation,
        code: programType.code,
      })
      .from(programType)
      .where(eq(programType.code, row.programTypeCode))
      .limit(1);

    if (!data) {
      throw new Error(`Program type ${row.programTypeCode} not found`);
    }

    const abbreviation =
      row.abbreviation === '' ? data.abbreviation : row.abbreviation;

    const code = row.code === '' ? data.code : row.code;

    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        abbreviation,
        code,
      });
    });
  }
}

const programTypeNavi = new ProgramTypeNaviSeed(t);

export { programTypeNavi };
