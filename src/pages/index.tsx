import React from "react";
import { GetStaticPropsContext } from "next";
import { useQuery } from "@apollo/client";
import {
  ArticleQuery,
  Page as RHHCApolloPage,
  PageContent as RHHCApolloPageContent,
  PageQuery,
} from "react-helsinki-headless-cms/apollo";
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
} from "react-helsinki-headless-cms";

import getHobbiesStaticProps from "../domain/app/getHobbiesStaticProps";
import serverSideTranslationsWithCommon from "../domain/i18n/serverSideTranslationsWithCommon";
import {
  getI18nPath,
  getLocaleOrError,
} from "../common-events/i18n/router/utils";
import { getQlLanguage } from "../common/apollo/utils";
import {
  LandingPageContentLayout,
  LANDING_PAGE_QUERY,
} from "../domain/search/landingPage/LandingPage";
import { DEFAULT_LANGUAGE } from "../constants";
import Navigation from "../common-events/components/navigation/Navigation";
import FooterSection from "../domain/footer/Footer";
import useRouter from "../common-events/i18n/router/useRouter";
import useLocale from "../common-events/hooks/useLocale";

export const getCollectionCard = (
  item: CollectionItemType,
  defaultImageUrl?: string
): CardProps => ({
  id: item?.id,
  title: item?.title ?? "",
  url: item?.link ?? "#",
  imageUrl: item?.featuredImage?.node?.mediaItemUrl || defaultImageUrl,
  ariaLabel: item?.title ?? "",
  className: undefined,
  imageLabel: item?.featuredImage?.node?.title ?? "",
  subTitle: undefined,
  text: getElementTextContent((item?.lead || item?.content) ?? ""),
  customContent: undefined,
  hasLink: true,
  withBorder: false,
  withShadow: true,
  clampText: true,
  direction: "responsive" as CardProps["direction"],
  target: "_self" as CardProps["target"],
});

export const defaultCollections = (
  page: PageQuery["page"] | ArticleQuery["post"],
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

export default function HomePage() {
  const router = useRouter();
  const locale = useLocale();
  const {
    utils: { getRoutedInternalHref },
  } = useConfig();
  const language = getQlLanguage(
    router.locale ?? router.defaultLocale ?? DEFAULT_LANGUAGE
  );
  const { data } = useQuery(LANDING_PAGE_QUERY, {
    variables: {
      languageCode: language,
    },
  });
  return (
    <RHHCApolloPage
      uri={getI18nPath("/", locale)}
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <RHHCApolloPageContent
          breadcrumbs={[]}
          landingPage={data.landingPage}
          PageContentLayoutComponent={LandingPageContentLayout}
          collections={(page) =>
            defaultCollections(page, getRoutedInternalHref)
          }
        />
      }
      footer={<FooterSection />}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async ({ cmsClient }) => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;
    // TODO: Stop using landing page here when the front page can be queried from the Headless CMS.
    // The front page should be queried instead - there is no need for landing page.
    await cmsClient.query({
      query: LANDING_PAGE_QUERY,
      variables: {
        languageCode: getQlLanguage(locale),
      },
    });

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          "home",
          "search",
        ])),
      },
    };
  });
}
