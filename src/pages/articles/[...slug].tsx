/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NormalizedCacheObject } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import {
  Breadcrumb,
  CollectionType,
  getCollections,
  PageContentProps,
  PageContent as RHHCPageContent,
  Page as RHHCPage,
  useConfig,
} from 'react-helsinki-headless-cms';
import {
  ArticleDocument,
  ArticleQuery,
  ArticleQueryVariables,
} from 'react-helsinki-headless-cms/apollo';
import { useTranslation } from 'next-i18next';

import Navigation from '../../common-events/components/navigation/Navigation';
import ShareLinks from '../../common-events/components/shareLinks/ShareLinks';
import {
  getDefaultCollections,
  getUriID,
} from '../../common-events/utils/headless-cms/headlessCmsUtils';
import KorosWrapper from '../../common/components/korosWrapper/KorosWrapper';
import { DEFAULT_LANGUAGE } from '../../constants';
import { createCmsApolloClient } from '../../domain/clients/cmsApolloClient';
import FooterSection from '../../domain/footer/Footer';
import serverSideTranslationsWithCommon from '../../domain/i18n/serverSideTranslationsWithCommon';
import { Language } from '../../types';
import { getLocaleOrError } from '../../utils/routerUtils';

const NextCmsArticle: NextPage<{
  article: ArticleQuery['post'];
  breadcrumbs: Breadcrumb[];
  collections?: CollectionType[];
}> = ({ article, breadcrumbs, collections }) => {
  const {
    currentLanguageCode,
    utils: { getRoutedInternalHref },
  } = useConfig();

  const { t } = useTranslation(['common']);

  return (
    <RHHCPage
      navigation={<Navigation />}
      content={
        <RHHCPageContent
          page={article as PageContentProps['page']}
          heroContainer={<KorosWrapper />}
          breadcrumbs={breadcrumbs}
          shareLinks={<ShareLinks title={t('common:share.article')} />}
          collections={
            collections
              ? getDefaultCollections(
                  article,
                  getRoutedInternalHref,
                  currentLanguageCode
                )
              : []
          }
        />
      }
      footer={<FooterSection />}
    />
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

type ResultProps =
  | {
      initialApolloState: NormalizedCacheObject;
      article: ArticleQuery['post'];
      breadcrumbs: Breadcrumb[];
      collections?: CollectionType[];
    }
  | {
      error?: {
        statusCode: number;
      };
    };

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ResultProps>> {
  try {
    const {
      currentArticle: article,
      breadcrumbs,
      cmsClient,
    } = await getProps(context);

    if (!article) {
      return {
        notFound: true,
        revalidate: true,
      };
    }
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;

    return {
      props: {
        initialApolloState: cmsClient.cache.extract(),
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          'cms',
        ])),
        article,
        breadcrumbs,
        collections: getCollections(article.modules ?? []),
      },
      revalidate: 60,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while generating content page', e);
    return {
      props: {
        error: {
          statusCode: 400,
        },
      },
      revalidate: 10,
    };
  }
}

const getProps = async (context: GetStaticPropsContext) => {
  const cmsClient = createCmsApolloClient();

  const { data: articleData } = await cmsClient.query<
    ArticleQuery,
    ArticleQueryVariables
  >({
    query: ArticleDocument,
    variables: {
      id: getUriID(
        context.params?.slug as string[],
        context.locale as Language
      ),
      //   idType: PageIdType.Uri,
    },
  });

  const currentArticle = articleData.post;

  return { currentArticle, breadcrumbs: [], cmsClient };
};

export default NextCmsArticle;
