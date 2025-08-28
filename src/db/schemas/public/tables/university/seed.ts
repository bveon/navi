import { and, eq } from 'drizzle-orm';

import { db } from '../../../../index';
import {
  stringToBoolean,
  stringToNumber,
  stringToNumberOrNull,
  stringToSlug,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { universityTranslation } from '../translation/university';

import { university as t } from '.';

class UniversitySeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    const [data] = await db
      .select({
        name: universityTranslation.translation,
      })
      .from(universityTranslation)
      .where(
        and(
          eq(universityTranslation.id, stringToNumber(row.tidName)),
          eq(universityTranslation.languageIso639Code, 'en'),
        ),
      )
      .limit(1);

    if (!data) {
      throw new Error(`University ${row.id} not found`);
    }

    if (!data.name) {
      throw new Error(`University ${row.id} English name not found`);
    }

    const slug = row.slug === '' ? stringToSlug(data.name) : row.slug;

    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        cityId: stringToNumber(row.cityId),
        foundingYear: stringToNumber(row.foundingYear),
        id: stringToNumber(row.id),
        internationalStudents: stringToNumber(row.internationalStudents),
        isActive: stringToBoolean(row.isActive),
        primaryUniversityId:
          row.primaryUniversityId === '' ?
            stringToNumber(row.id)
          : stringToNumber(row.primaryUniversityId),
        slug,
        students: stringToNumber(row.students),
        tidDescription: stringToNumberOrNull(row.tidDescription),
        tidName: stringToNumber(row.tidName),
      });
    });
  }
}

const university = new UniversitySeed(t);

export { university };
