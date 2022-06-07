import { supportedLanguages } from "../../constants";
import { Locale } from "../../types";
// import { LocalizedObject } from "../generated/graphql";
// TODO: Get from graphql schema
export type LocalizedObject = {
  __typename?: "LocalizedObject";
  fi?: string;
  sv?: string;
  en?: string;
};

/**
 * Check is the instance that is rendering component client (not SSR)
 */
const getLocalizedString = (
  obj: LocalizedObject | undefined | null = {},
  language: Locale
): string => {
  if (obj === null) {
    return "";
  }

  const languages = [
    language,
    ...supportedLanguages.filter((item) => item !== language),
  ];
  // Find first language which has value
  const locale = languages.find((lng) => obj[lng]);
  // Return value in correct language
  return (locale && obj[locale]) || "";
};

export default getLocalizedString;
