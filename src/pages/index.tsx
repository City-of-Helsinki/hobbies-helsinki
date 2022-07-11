import React from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import {
  ArticleQuery,
  PageQuery,
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  PageByTemplateDocument,
  LandingPageDocument,
  LandingPageQuery,
  LandingPageQueryVariables,
  TemplateEnum,
} from 'react-helsinki-headless-cms/apollo';
import {
  Card,
  CardProps,
  Collection,
  CollectionItemType,
  CollectionType,
  getCollections,
  getElementTextContent,
  isLayoutPage,
  ModuleItemTypeEnum,
  useConfig,
  PageContentProps,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
} from 'react-helsinki-headless-cms';

import getHobbiesStaticProps from '../domain/app/getHobbiesStaticProps';
import serverSideTranslationsWithCommon from '../domain/i18n/serverSideTranslationsWithCommon';
import { getLocaleOrError } from '../common-events/i18n/router/utils';
import { getQlLanguage } from '../common/apollo/utils';
import { LandingPageContentLayout } from '../domain/search/landingPage/LandingPage';
import { DEFAULT_LANGUAGE } from '../constants';
import Navigation from '../common-events/components/navigation/Navigation';
import FooterSection from '../domain/footer/Footer';
import useLocale from '../common-events/hooks/useLocale';

export const getCollectionCard = (
  item: CollectionItemType,
  defaultImageUrl?: string
): CardProps => ({
  id: item?.id,
  title: item?.title ?? '',
  url: item?.link ?? '#',
  imageUrl: item?.featuredImage?.node?.mediaItemUrl || defaultImageUrl,
  ariaLabel: item?.title ?? '',
  className: undefined,
  imageLabel: item?.featuredImage?.node?.title ?? '',
  subTitle: undefined,
  text: getElementTextContent((item?.lead || item?.content) ?? ''),
  customContent: undefined,
  hasLink: true,
  withBorder: false,
  withShadow: true,
  clampText: true,
  direction: 'responsive' as CardProps['direction'],
  target: '_self' as CardProps['target'],
});

export const defaultCollections = (
  page: PageQuery['page'] | ArticleQuery['post'],
  getRoutedInternalHref: (link: string, type: ModuleItemTypeEnum) => string
) =>
  getCollections(page?.modules as CollectionType[])?.map((collection) => {
    const cards = collection.items.map((item) => {
      const itemType = isLayoutPage(item)
        ? ModuleItemTypeEnum.Page
        : ModuleItemTypeEnum.Article;
      const cardProps = getCollectionCard(item);
      const url = getRoutedInternalHref(item?.link as string, itemType);
      return <Card key={item?.id} {...cardProps} url={url} />;
    });
    return (
      <Collection
        key={`collection-${Math.random()}`}
        title={collection.title}
        cards={cards}
        type="grid"
        collectionContainerProps={{ withDots: false }}
      />
    );
  });

const HomePage: NextPage<{
  landingPage: LandingPageQuery['landingPage'];
  page: PageQuery['page'];
}> = ({ landingPage, page }) => {
  const locale = useLocale();
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  return (
    <HCRCPage
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <HCRCPageContent
          breadcrumbs={[]}
          page={page}
          landingPage={landingPage}
          PageContentLayoutComponent={LandingPageContentLayout}
          collections={(page: PageContentProps['page']) =>
            defaultCollections(page, getRoutedInternalHref)
          }
          language={getQlLanguage(locale)}
        />
      }
      footer={<FooterSection />}
    />
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;
    const { data: landingPageData } = await cmsClient.query<
      LandingPageQuery,
      LandingPageQueryVariables
    >({
      query: LandingPageDocument,
      variables: {
        id: 'root',
        languageCode: getQlLanguage(locale),
      },
    });

    const { data: pageData } = await cmsClient.query<
      PageByTemplateQuery,
      PageByTemplateQueryVariables
    >({
      query: PageByTemplateDocument,
      variables: {
        template: TemplateEnum.FrontPage,
        language: getQlLanguage(locale).toLocaleLowerCase(),
      },
    });

    const page = pageData.pageByTemplate;

    const landingPage = landingPageData.landingPage;

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          'home',
          'search',
        ])),
        landingPage: landingPage,
        page: page,
      },
    };
  });
}

export default HomePage;
