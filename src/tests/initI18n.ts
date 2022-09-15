import i18n from 'i18next';
// eslint-disable-next-line no-restricted-imports
import { initReactI18next } from 'react-i18next';

import cms from '../../public/locales/fi/cms.json';
import common from '../../public/locales/fi/common.json';
import event from '../../public/locales/fi/event.json';
import footer from '../../public/locales/fi/footer.json';
import home from '../../public/locales/fi/home.json';
import notFound from '../../public/locales/fi/notFound.json';
import search from '../../public/locales/fi/search.json';

import cms_en from '../../public/locales/en/cms.json';
import common_en from '../../public/locales/en/common.json';
import event_en from '../../public/locales/en/event.json';
import footer_en from '../../public/locales/en/footer.json';
import home_en from '../../public/locales/en/home.json';
import notFound_en from '../../public/locales/en/notFound.json';
import search_en from '../../public/locales/en/search.json';

import cms_sv from '../../public/locales/sv/cms.json';
import common_sv from '../../public/locales/sv/common.json';
import event_sv from '../../public/locales/sv/event.json';
import footer_sv from '../../public/locales/sv/footer.json';
import home_sv from '../../public/locales/sv/home.json';
import notFound_sv from '../../public/locales/sv/notFound.json';
import search_sv from '../../public/locales/sv/search.json';

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
  lng: 'fi',
  fallbackLng: 'fi',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
  resources: {
    fi: translations,
    en: {
      cms: cms_en,
      common: common_en,
      event: event_en,
      footer: footer_en,
      home: home_en,
      notFound: notFound_en,
      search: search_en,
    },
    sv:  {
      cms: cms_sv,
      common: common_sv,
      event: event_sv,
      footer: footer_sv,
      home: home_sv,
      notFound: notFound_sv,
      search: search_sv,
    },
  },
});

export default i18n;
