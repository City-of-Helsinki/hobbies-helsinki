import { camelCase, startCase } from 'lodash';

const toPascalCase = (str: string) =>
  startCase(camelCase(str)).replace(/ /g, '');

/**
 * Translate a single value
 */
export const translateValue = (
  prefix: string,
  value: string,
  t: (s: string) => string
): string => {
  return t(
    prefix
      ? `${prefix}${
          prefix.endsWith('.') ? camelCase(value) : toPascalCase(value)
        }`
      : camelCase(value)
  );
};

/**
 * Translate a list
 */
export const translateList = (
  prefix: string,
  list: string[],
  t: (s: string) => string
): string => {
  return list.map((value) => translateValue(prefix, value, t)).join(', ');
};
