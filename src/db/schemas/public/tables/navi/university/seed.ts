import { eq } from 'drizzle-orm';

import { db } from '../../../../../index';
import {
  stringToBoolean,
  stringToNumber,
  stringToNumberOrNull,
  stringToStringOrNull,
} from '../../../../../utils/coercion';
import { Seed } from '../../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../../utils/timestamps';
import { university } from '../../university';

import { universityNavi as t } from '.';

class UniversityNaviSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    const [data] = await db
      .select({
        isActive: university.isActive,
        slug: university.slug,
      })
      .from(university)
      .where(eq(university.id, stringToNumber(row.universityId)))
      .limit(1);

    if (!data) {
      throw new Error(`University ${row.universityId} not found`);
    }

    const id =
      row.id === '' ?
        20_000 + stringToNumber(row.universityId)
      : stringToNumber(row.id);

    const isActive =
      row.isActive === '' ? data.isActive : stringToBoolean(row.isActive);

    const slug = row.slug === '' ? data.slug : row.slug;

    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        endDate: stringToStringOrNull(row.endDate),
        id,
        imgVersion: stringToNumber(row.imgVersion),
        isActive,
        nonApplicableCountryCode: stringToStringOrNull(
          row.nonApplicableCountryCode,
        ),
        score: stringToNumber(row.score),
        slug,
        uapplyId: stringToNumberOrNull(row.uapplyId),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const universityNavi = new UniversityNaviSeed(t);

export { universityNavi };
