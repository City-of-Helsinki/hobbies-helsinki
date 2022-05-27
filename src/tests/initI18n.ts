import i18n from "i18next";
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from "react-i18next";

const translation = {};

i18n.use(initReactI18next).init({
  lng: "fi",
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
  resources: {
    fi: translation,
  },
});

export default i18n;
