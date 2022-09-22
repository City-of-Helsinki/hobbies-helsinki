import { ArticleType, PageType } from 'react-helsinki-headless-cms';
import {
  // MenuQuery,
  // MenuQueryVariables,
  // MenuDocument,
  // PageQuery,
  // PageQueryVariables,
  // PageDocument,
  PostsQuery,
  PostsQueryVariables,
  PostsDocument,
  PagesQuery,
  PagesQueryVariables,
  PagesDocument,
} from 'react-helsinki-headless-cms/apollo';

// import {
//   DEFAULT_HEADER_MENU_NAME,
//   SUPPORT_LANGUAGES,
// } from '../../../constants';
import { createCmsApolloClient } from '../../../domain/clients/cmsApolloClient';
import { PageInfo } from './types';

export const ARTICLES_AMOUNT_LIMIT = 100;
export const PAGES_AMOUNT_LIMIT = 100;

export const getAllArticles = async (): Promise<PageInfo[]> => {
  const pageInfos: PageInfo[] = [];
  const cmsClient = createCmsApolloClient();
  const { data: articlesData } = await cmsClient.query<
    PostsQuery,
    PostsQueryVariables
  >({
    query: PostsDocument,
    variables: {
      first: ARTICLES_AMOUNT_LIMIT,
    },
  });
  articlesData.posts?.edges?.forEach((edge) =>
    addArticleToPageInfosArray(edge?.node as ArticleType)
  );
  return pageInfos;

  function addArticleToPageInfosArray(node: ArticleType) {
    if (node && node.uri && node.slug && node.language?.code) {
      pageInfos.push({
        uri: node.uri,
        locale: node.language.code.toLowerCase(),
        slug: node.slug,
      });
      node.translations?.forEach((translation) => {
        if (
          translation?.uri &&
          translation.slug &&
          translation.language?.code
        ) {
          const {
            uri,
            slug,
            language: { code },
          } = translation;
          pageInfos.push({
            uri,
            slug,
            locale: code.toLocaleLowerCase(),
          });
        }
      });
    }
  }
};

export const getAllPages = async (): Promise<PageInfo[]> => {
  const pageInfos: PageInfo[] = [];
  const cmsClient = createCmsApolloClient();
  const { data: pagesData } = await cmsClient.query<
    PagesQuery,
    PagesQueryVariables
  >({
    query: PagesDocument,
    variables: {
      first: PAGES_AMOUNT_LIMIT,
    },
  });
  pagesData.pages?.edges?.forEach((edge) =>
    addPagesToPageInfosArray(edge?.node as PageType)
  );
  return pageInfos;

  function addPagesToPageInfosArray(node: PageType) {
    if (node && node.uri && node.slug && node.language?.code) {
      pageInfos.push({
        uri: node.uri,
        locale: node.language.code.toLowerCase(),
        slug: node.slug,
      });
      node.translations?.forEach((translation) => {
        if (
          translation?.uri &&
          translation.slug &&
          translation.language?.code
        ) {
          const {
            uri,
            slug,
            language: { code },
          } = translation;
          pageInfos.push({
            uri,
            slug,
            locale: code.toLocaleLowerCase(),
          });
        }
      });
    }
  }
};

// function addNodesToPageInfosArray(
//   node: PageType | ArticleType,
//   pageInfos: PageInfo[]
// ) {
//   if (node && node.uri && node.slug && node.language?.code) {
//     pageInfos.push({
//       uri: node.uri,
//       locale: node.language.code.toLowerCase(),
//       slug: node.slug,
//     });
//     node.translations?.forEach((translation) => {
//       if (translation?.uri && translation.slug && translation.language?.code) {
//         const {
//           uri,
//           slug,
//           language: { code },
//         } = translation;
//         pageInfos.push({
//           uri,
//           slug,
//           locale: code.toLocaleLowerCase(),
//         });
//       }
//     });
//   }
// }

/*
export const getAllMenuPages = async (
  locale: SUPPORT_LANGUAGES
): Promise<PageInfo[]> => {
  const pageInfos: PageInfo[] = [];
  const cmsClient = createCmsApolloClient();
  const { data: navigationData } = await cmsClient.query<
    MenuQuery,
    MenuQueryVariables
  >({
    query: MenuDocument,
    variables: {
      id: DEFAULT_HEADER_MENU_NAME[locale ?? 'fi'],
    },
  });

  const menuItemPromises = navigationData.menu?.menuItems?.nodes?.map(
    (menuItem) => getPageChildren(menuItem?.connectedNode?.node as PageType)
  );

  if (menuItemPromises) {
    await Promise.all(menuItemPromises);
  }

  return pageInfos;

  async function getPageChildren(node?: PageType): Promise<unknown> {
    if (node) addPageToPageInfosArray(node);
    if (node?.children?.nodes) {
      return Promise.all(
        node.children.nodes.map(async (page: PageType) => {
          if (page?.id) {
            const { data: childPage } = await cmsClient.query<
              PageQuery,
              PageQueryVariables
            >({
              query: PageDocument,
              variables: {
                id: page.id,
              },
            });
            return getPageChildren(childPage.page as PageType);
          }
        })
      );
    }
  }

  function addPageToPageInfosArray(node: PageType) {
    if (node && node.uri && node.slug && node.language?.code) {
      pageInfos.push({
        uri: node.uri,
        locale: node.language.code.toLowerCase(),
        slug: node.slug,
      });
      node.translations?.forEach((translation: PageType['translation']) => {
        if (
          translation?.uri &&
          translation.slug &&
          translation.language?.code
        ) {
          const {
            uri,
            slug,
            language: { code },
          } = translation;
          pageInfos.push({
            uri,
            slug,
            locale: code.toLocaleLowerCase(),
          });
        }
      });
    }
  }
};
*/
