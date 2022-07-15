import { i18n } from '../../../next-i18next.config';
import { EventTypeId } from '../nextApi/graphql/generated/graphql';

class AppConfig {
  static get cmsGraphqlEndpoint() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT,
      'NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT'
    );
  }

  static get eventsGraphqlEndpoint() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_EVENTS_GRAPHQL_ENDPOINT,
      'NEXT_PUBLIC_EVENTS_GRAPHQL_ENDPOINT'
    );
  }

  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT,
      'NEXT_PUBLIC_LINKEDEVENTS_EVENT_ENDPOINT'
    );
  }

  static get origin() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_APP_ORIGIN,
      'NEXT_PUBLIC_APP_ORIGIN'
    );
  }

  static get supportedEventTypes() {
    return [EventTypeId.Course];
  }

  static get locales() {
    return i18n.locales;
  }

  static get defaultLocale() {
    return i18n.defaultLocale;
  }

  static get allowUnauthorizedRequests() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS)
    );
  }

  static get debug() {
    return Boolean(parseEnvValue(process.env.NEXT_PUBLIC_DEBUG));
  }

  static get matomoConfiguration() {
    const matomoUrlBase = '//webanalytics.digiaiiris.com/js/';
    const matomoEnabled = process.env.NEXT_PUBLIC_MATOMO_ENABLED;
    const matomoSiteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
    const getMatomoUrlPath = (path: string) => `${matomoUrlBase}${path}`;

    if (matomoEnabled && matomoSiteId) {
      return {
        disabled: !Boolean(parseEnvValue(matomoEnabled)),
        urlBase: matomoUrlBase as string,
        srcUrl: getMatomoUrlPath('piwik.min.js'),
        trackerUrl: getMatomoUrlPath('tracker.php'),
        siteId: Number(matomoSiteId),
      };
    }
    return null;
  }

  static get defaultRevalidate() {
    const envValue = process.env.NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS;
    const value = envValue ? parseEnvValue(envValue) : 10;

    if (typeof value !== 'number') {
      throw Error(
        'NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS must be a value that can be parsed into a number'
      );
    }

    return value;
  }

  static get showSimilarEvents() {
    return Boolean(parseEnvValue(process.env.NEXT_PUBLIC_SHOW_SIMILAR_EVENTS));
  }
}

function parseEnvValue(
  value?: string,
  defaultValue: boolean | string | number | null = null
) {
  if (!value) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

// Accept both variable and name so that variable can be correctly replaced
// by build.
// process.env.VAR => value
// process.env["VAR"] => no value
// Name is used to make debugging easier.
function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }

  return variable;
}

export default AppConfig;
