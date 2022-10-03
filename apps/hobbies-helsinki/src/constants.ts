import { Language } from './types';

export const DEFAULT_LANGUAGE = 'fi'

export const ROUTES = {
  SEARCH: '/search',
  COURSES: '/courses/[eventId]',
  ARTICLE_ARCHIVE: '/article-archive',
  ARTICLES: '/articles/[...slug]',
  PAGES: '/pages/[...slug]',
  LINK: '',
};

export const AUTOSUGGEST_KEYWORD_BLACK_LIST = [
  'kulke:354', // Seniorit
];

export const EXTLINK = {
  EXTLINK_FACEBOOK: 'extlink_facebook',
  EXTLINK_INSTAGRAM: 'extlink_instagram',
  EXTLINK_TWITTER: 'extlink_twitter',
  EXTLINK_YOUTUBE: 'extlink_youtube',
};

export const DATE_TYPES = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  WEEKEND: 'weekend',
  THIS_WEEK: 'this_week',
};

export const EVENT_STATUS = {
  EVENT_CANCELLED: 'EventCancelled',
  EVENT_SCHEDULED: 'EventScheduled',
};

export enum DATE_PICKER_INPUT {
  START = 'start',
  END = 'end',
}

export enum DATE_PICKER_INPUT_STATE {
  NOT_SELECTED = 'not-selected',
  START_TIME_SELECTED = 'start-time-selected',
  END_TIME_SELECTED = 'end-time-selected',
}

export const DEFAULT_SOME_IMAGE = '/images/activities_SoMe-share.jpg';

// export const MAIN_CONTENT_ID = "maincontent";

export const FEEDBACK_LINKS = {
  fi: 'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute',
  en: 'https://www.hel.fi/helsinki/en/administration/participate/feedback',
  sv: 'https://www.hel.fi/helsinki/sv/stad-och-forvaltning/delta/feedback',
};

export const DEFAULT_HEADER_MENU_NAME: Record<Language, string> = {
  fi:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_FI ??
    'Hobbies Helsinki Header FI',
  en:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_EN ??
    'Hobbies Helsinki Header EN',
  sv:
    process.env.NEXT_PUBLIC_CMS_HEADER_MENU_NAME_SV ??
    'Hobbies Helsinki Header SV',
};

export const DEFAULT_FOOTER_MENU_NAME: Record<Language, string> = {
  fi:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_FI ??
    'Hobbies Helsinki Footer FI',
  en:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_EN ??
    'Hobbies Helsinki Footer EN',
  sv:
    process.env.NEXT_PUBLIC_CMS_FOOTER_MENU_NAME_SV ??
    'Hobbies Helsinki Footer SV',
};