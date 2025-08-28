import {
  stringToBoolean,
  stringToEnum,
  stringToNumber,
  stringToNumberOrNull,
  stringToStringOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { studyLevelEnum } from '../../enums';

import { course as t } from '.';

class CourseSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        concentration: stringToStringOrNull(row.concentration),
        cricosCode: stringToStringOrNull(row.cricosCode),
        degreeId: stringToNumber(row.degreeId),
        durationPg: stringToNumber(row.durationPg),
        durationUg: stringToNumber(row.durationUg),
        honors: stringToBoolean(row.honors),
        id: stringToNumber(row.id),
        isActive: stringToBoolean(row.isActive),
        isIndustryIncluded: stringToBoolean(row.isIndustryIncluded),
        isIndustryOptional: stringToBoolean(row.isIndustryOptional),
        isStudyAbroadIncluded: stringToBoolean(row.isStudyAbroadIncluded),
        isStudyAbroadOptional: stringToBoolean(row.isStudyAbroadOptional),
        majorId: stringToNumber(row.majorId),
        studyLevel: stringToEnum(row.studyLevel, studyLevelEnum.enumValues),
        tidDescription: stringToNumberOrNull(row.tidDescription),
        universityId: stringToNumber(row.universityId),
      });
    });
  }
}

const course = new CourseSeed(t);

export { course };
