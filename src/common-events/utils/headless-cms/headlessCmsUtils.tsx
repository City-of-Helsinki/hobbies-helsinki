import format from 'date-fns/format';
import {
  ArticleType,
  Card,
  Category,
  Categories,
  CollectionItemType,
  getCollections,
  Collection,
  Config as RCHCConfig,
  EventSearchCollection,
  EventSelectionCollection,
  getCollectionUIType,
  isEventSearchCollection,
  isEventSelectionCollection,
  PageType,
  GeneralCollectionType,
  CardProps,
  isPageType,
  isArticleType,
  getArticlePageCardProps as getArticlePageCardPropsBase,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import { DEFAULT_LANGUAGE } from '../../../constants';
import AppConfig from '../../../domain/app/AppConfig';
import ArticleDetails from '../../../domain/article/articleDetails/ArticleDetails';
import { Language } from '../../../types';

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

export function getArticlePageCardProps(
  item: ArticleType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps {
  return {
    ...getArticlePageCardPropsBase(item),
    subTitle: item?.date
      ? format(new Date(item.date), AppConfig.dateFormat)
      : '',
    url: getRoutedInternalHref(
      item?.link ?? item?.uri,
      ModuleItemTypeEnum.Article
    ),
  };
}

export function getCmsPageCardProps(
  item: PageType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps {
  return {
    ...getArticlePageCardPropsBase(item),
    url: getRoutedInternalHref(
      item?.link ?? item?.uri,
      ModuleItemTypeEnum.Page
    ),
  };
}

export function _collectGeneralCards(
  items: CollectionItemType[],
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref']
): CardProps[] {
  return items.reduce((result: CardProps[], item) => {
    if (isArticleType(item)) {
      result.push(getArticlePageCardProps(item, getRoutedInternalHref));
    } else if (isPageType(item)) {
      result.push(getCmsPageCardProps(item, getRoutedInternalHref));
    }
    // NOTE: Event type is not a general type
    // else if (isEventType(item)) {
    //   result.push({
    //     ...getEventCardProps(item, locale),
    //     url: getRoutedInternalHref(item, ModuleItemTypeEnum.Event),
    //   });
    // }
    return result;
  }, []);
}

export function getGeneralCollectionCards(
  collection: GeneralCollectionType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locale = 'fi'
): CardProps[] {
  return _collectGeneralCards(collection.items, getRoutedInternalHref);
}

export const getDefaultCollections = (
  page: PageType | ArticleType,
  getRoutedInternalHref: RCHCConfig['utils']['getRoutedInternalHref'],
  currentLanguageCode: RCHCConfig['currentLanguageCode']
) =>
  getCollections(page?.modules ?? [], true)?.reduce(
    (collectionElements: JSX.Element[], collection) => {
      const commonCollectionProps = {
        key: `collection-${Math.random()}`,
        title: collection.title,
        description: collection.description,
        type: getCollectionUIType(collection),
        collectionContainerProps: { withDots: true },
      };

      if (isEventSearchCollection(collection)) {
        collectionElements.push(
          <EventSearchCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else if (isEventSelectionCollection(collection)) {
        collectionElements.push(
          <EventSelectionCollection
            {...commonCollectionProps}
            collection={collection}
          />
        );
      } else {
        const items = { ...collection.items };
        const cards = getGeneralCollectionCards(
          collection,
          getRoutedInternalHref,
          currentLanguageCode
        ).map((cardProps, i) => {
          const item = items[i] as ArticleType;
          const categories = item?.categories as Categories;
          // item should be of type ArticleType but categories then has edges instead of nodes
          // item?.categories?.edges?.map((category) => category?.node?.name)

          return (
            <Card
              key={Math.random()}
              {...cardProps}
              direction="fixed-vertical"
              customContent={
                <ArticleDetails
                  keywords={
                    categories?.nodes?.map(
                      (category: Category) => category?.name || ''
                    ) || []
                  }
                />
              }
            />
          );
        });
        collectionElements.push(
          <Collection {...commonCollectionProps} cards={cards} />
        );
      }
      return collectionElements;
    },
    []
  );
