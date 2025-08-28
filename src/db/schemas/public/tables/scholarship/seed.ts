import {
  stringToBoolean,
  stringToEnum,
  stringToNumber,
  stringToNumberOrNull,
} from '../../../../utils/coercion';
import { Seed } from '../../../../utils/seed';
import { timestampsDefaultValues } from '../../../../utils/timestamps';
import { durationUnitEnum, scholarshipTypeEnum } from '../../enums';

import { scholarship as t } from '.';

class ScholarshipSeed extends Seed<typeof t, typeof t.$inferSelect> {
  protected async transform(
    row: Record<keyof typeof t.$inferSelect, string>,
  ): Promise<typeof t.$inferSelect> {
    return new Promise((resolve) => {
      resolve({
        ...row,
        ...timestampsDefaultValues,
        duration: stringToNumber(row.duration),
        durationUnit: stringToEnum(
          row.durationUnit,
          durationUnitEnum.enumValues,
        ),
        hasCapacity: stringToBoolean(row.hasCapacity),
        id: stringToNumber(row.id),
        isActive: stringToBoolean(row.isActive),
        isCapacity: stringToBoolean(row.isCapacity),
        max: stringToNumber(row.max),
        min: stringToNumberOrNull(row.min),
        tidDescription: stringToNumberOrNull(row.tidDescription),
        tidName: stringToNumber(row.tidName),
        tidRequirements: stringToNumberOrNull(row.tidRequirements),
        type: stringToEnum(row.type, scholarshipTypeEnum.enumValues),
      });
    });
  }
}

const scholarship = new ScholarshipSeed(t);

export { scholarship };
