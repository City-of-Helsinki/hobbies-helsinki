import { useTranslation } from "next-i18next";

import { Locale } from "../../types";

const useLocale = (): Locale => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  switch (language) {
    case "en":
    case "fi":
    case "sv":
      return language;
    default:
      return "fi";
  }
};

export default useLocale;
