import {
  Card,
  Collection,
  CollectionItemType,
  CollectionType,
  getElementTextContent,
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

export function getCmsCollectionList(collections: CollectionType[]) {
  return collections.map((collection) => (
    <Collection
      key={`collection-${Math.random()}`}
      title={collection.title}
      collectionContainerProps={{
        withDots: collection.items.length < 4 ? false : true,
      }}
      type="grid"
      cards={collection.items.map((item) =>
        item ? (
          <Card
            key={item.id}
            {...item}
            title={item.title ?? ''}
            text={getElementTextContent((item.lead || item.content) ?? '')}
            clampText={true}
            withShadow={true}
            hasLink={true}
            url={getCollectionItemUrl(item)}
            imageLabel={item.featuredImage?.node?.title ?? ''}
            imageUrl={item.featuredImage?.node?.mediaItemUrl ?? ''}
          />
        ) : (
          <></>
        )
      )}
    />
  ));
}

export function getCollectionItemUrl(item: CollectionItemType): string {
  if (!item) {
    return '#';
  }
  if (item.__typename === 'Post') {
    return getCmsArticlePath(item.uri);
  }
  if (item.__typename === 'Page') {
    return getCmsPagePath(item.uri);
  }
  return item?.uri ?? '';
}

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
