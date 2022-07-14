import React from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import {
  PageByTemplateQuery,
  PageByTemplateQueryVariables,
  PageByTemplateDocument,
  LandingPageDocument,
  LandingPageQuery,
  LandingPageQueryVariables,
  TemplateEnum,
} from 'react-helsinki-headless-cms/apollo';
import {
  useConfig,
  PageContent as HCRCPageContent,
  Page as HCRCPage,
  PageType,
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
import { getDefaultCollections } from '../common-events/utils/headless-cms/headlessCmsUtils';

const HomePage: NextPage<{
  landingPage: LandingPageQuery['landingPage'];
  page: PageType;
}> = ({ landingPage, page }) => {
  const locale = useLocale();
  const {
    currentLanguageCode,
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
          collections={(page: PageType) =>
            getDefaultCollections(
              page,
              getRoutedInternalHref,
              currentLanguageCode
            )
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
