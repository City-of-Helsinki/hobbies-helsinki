import {
  ArticleType,
  Card,
  getCollections,
  Collection,
  Config as RCHCConfig,
  EventSearchCollection,
  EventSelectionCollection,
  getCollectionUIType,
  isEventSearchCollection,
  isEventSelectionCollection,
  ModuleItemTypeEnum,
  PageType,
  GeneralCollectionType,
  CardProps,
  isPageType,
  isArticleType,
  isEventType,
  getEventCardProps,
  getArticlePageCardProps,
} from 'react-helsinki-headless-cms';

import { DEFAULT_LANGUAGE } from '../../../constants';
import { Language } from '../../../types';
import { getI18nPath } from '../../i18n/router/utils';

export const getUriID = (slugs: string[], locale: Language): string => {
  if (!slugs) return '/';
  if (locale === DEFAULT_LANGUAGE) {
    return `/${slugs.join('/')}/`;
  }
  return `/${locale}/${slugs.join('/')}/`;
};

export const getSlugFromUri = (uri?: string | null): string[] | null => {
  const uriWithoutLang = stripLocaleFromUri(uri ?? '');
  if (uriWithoutLang) {
    return uriWithoutLang.split('/').filter((i) => i);
  }
  return null;
};

export const stripLocaleFromUri = (uri: string): string => {
  return uri.replace(/^\/(en|sv|fi)(?![a-z0-9])/i, '');
};

export const removeTrailingSlash = (uri: string): string => {
  return uri.replace(/\/$/, '');
};

// '/segment1/segment2/' -> ['/segment1/', '/segment1/segment2/']
// current implementation required both leading and trailing slashes
// to include all breadcrumbs
export const uriToBreadcrumbs = (uri: string): string[] => {
  return slugsToUriSegments(
    stripLocaleFromUri(uri)
      .split('/')
      // Filter out empty strings
      .filter((i) => i)
  );
};

export const slugsToUriSegments = (slugs: string[]): string[] => {
  return slugs.map((slug, index) => {
    return `/${slugs.slice(0, index + 1).join('/')}/`;
  });
};

export const getCmsPagePath = (uri?: string | null): string => {
  if (!uri) return '#';
  const locale = stripLocaleFromUri(uri);
  return getI18nPath('/pages', locale) + uri;
};

export const getCmsArticlePath = (uri?: string | null): string => {
  if (!uri) return '#';
  const locale = stripLocaleFromUri(uri);
  return getI18nPath('/articles', locale) + uri;
};

export function getCollectionCards(
  collection: GeneralCollectionType,
  defaultImageUrl?: string,
  locale = 'fi'
): CardProps[] {
  return collection.items.reduce((result: CardProps[], item) => {
    if (isPageType(item) || isArticleType(item))
      result.push(getArticlePageCardProps(item, defaultImageUrl));
    else if (isEventType(item))
      result.push(getEventCardProps(item, defaultImageUrl, locale));

    return result;
  }, []);
}

export const getDefaultCollections = (
  page: PageType | ArticleType,
  getRoutedInternalHref: (link: string, type: ModuleItemTypeEnum) => string,
  currentLanguageCode: RCHCConfig['currentLanguageCode']
) =>
  getCollections(page?.modules ?? [], true)?.reduce(
    (collectionElements: JSX.Element[], collection) => {
      const defaultImageUrl = '';
      const commonCollectionProps = {
        key: `collection-${Math.random()}`,
        title: collection.title,
        description: collection.description,
        type: getCollectionUIType(collection),
        collectionContainerProps: { withDots: false },
      };

      if (isEventSearchCollection(collection)) {
        console.debug('Adding isEventSearchCollection');
        collectionElements.push(
          <EventSearchCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else if (isEventSelectionCollection(collection)) {
        console.debug('Adding EventSelectionCollection');
        collectionElements.push(
          <EventSelectionCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else {
        console.debug('Adding GeneralCollection');
        const cards = getCollectionCards(
          collection,
          defaultImageUrl,
          currentLanguageCode
        ).map((cardProps) => <Card key={Math.random()} {...cardProps} />);
        console.debug('cards', cards);
        collectionElements.push(
          <Collection {...commonCollectionProps} cards={cards} />
        );
      }
      console.debug('collectionElements', collectionElements);
      return collectionElements;
    },
    []
  );
