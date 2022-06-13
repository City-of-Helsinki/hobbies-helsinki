import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nextConfig from "../../../next-i18next.config";
import { Language } from "../../types";

const COMMON_TRANSLATIONS = [
  "common",
  "navigation",
  "footer",
  "card",
  "date_time_picker",
  "geolocation_provider",
  "toast",
  "utils",
  "link",
];

export default async function serverSideTranslationsWithCommon(
  locale: Language,
  namespaces: string[] = []
) {
  return serverSideTranslations(
    locale,
    [...COMMON_TRANSLATIONS, ...namespaces],
    nextI18nextConfig
  );
}
