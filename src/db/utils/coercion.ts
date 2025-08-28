function checkIsNotNull(value: string): null | string {
  return value === '' ? null : value;
}

function stringToBoolean(value: string): boolean {
  return value === 'TRUE';
}

function stringToBooleanOrNull(value: string): boolean | null {
  return checkIsNotNull(value) ? stringToBoolean(value) : null;
}

function stringToEnum<E>(value: string, enumValues: E[]): E {
  const foundValue = enumValues.find((enumValue) => enumValue === value);

  if (!foundValue) {
    throw new Error(`Invalid enum value: ${value}`);
  }

  return foundValue;
}

function stringToEnumOrNull<E>(value: string, enumType: E[]): E | null {
  return checkIsNotNull(value) ? stringToEnum(value, enumType) : null;
}

function stringToNumber(value: string): number {
  return Number.parseInt(value, 10);
}

function stringToNumberOrNull(value: string): null | number {
  return checkIsNotNull(value) ? stringToNumber(value) : null;
}

function stringToSlug(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[,'.&]/g, '')
    .replaceAll(/[\s-]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');
}

function stringToSlugOrNull(value: string): null | string {
  return checkIsNotNull(value) ? stringToSlug(value) : null;
}

function stringToStringOrNull(value: string): null | string {
  return checkIsNotNull(value);
}

export {
  stringToBoolean,
  stringToBooleanOrNull,
  stringToEnum,
  stringToEnumOrNull,
  stringToNumber,
  stringToNumberOrNull,
  stringToSlug,
  stringToSlugOrNull,
  stringToStringOrNull,
};
