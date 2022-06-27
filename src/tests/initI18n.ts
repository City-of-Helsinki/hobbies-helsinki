import i18n from "i18next";
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from "react-i18next";
import cms from "../../public/locales/fi/cms.json";
import common from "../../public/locales/fi/common.json";
import event from "../../public/locales/fi/event.json";
import footer from "../../public/locales/fi/footer.json";
import home from "../../public/locales/fi/home.json";
import notFound from "../../public/locales/fi/notFound.json";
import search from "../../public/locales/fi/search.json";

export const translations = {
  cms,
  common,
  event,
  footer,
  home,
  notFound,
  search,
};

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
    fi: translations,
  },
});

export default i18n;
