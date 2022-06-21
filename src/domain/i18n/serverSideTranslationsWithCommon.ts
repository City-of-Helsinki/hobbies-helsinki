import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18nextConfig from "../../../next-i18next.config";
import { Language } from "../../types";

const COMMON_TRANSLATIONS = ["common", "footer", "notFound"];

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
