import React, { useRef } from "react";
import { GetStaticPropsContext } from "next";
import { useEffect } from "react";
import { Page as RHHCApolloPage } from "react-helsinki-headless-cms/apollo";

import getHobbiesStaticProps from "../../domain/app/getHobbiesStaticProps";
import useRouter from "../../domain/i18n/router/useRouter";
import serverSideTranslationsWithCommon from "../../domain/i18n/serverSideTranslationsWithCommon";
import { getLocaleOrError } from "../../domain/i18n/router/utils";
import { DEFAULT_LANGUAGE } from "../../constants";
import AdvancedSearch from "../../domain/search/eventSearch/AdvancedSearch";
import Navigation from "../../common-events/components/navigation/Navigation";
import SearchPage from "../../domain/search/eventSearch/SearchPage";

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listElement = listRef.current;

    if (scrollTo) {
      const listItemElement = listElement?.querySelector(
        decodeURIComponent(scrollTo.toString())
      );

      if (listItemElement) {
        listItemElement.scrollIntoView({
          block: "center",
        });
      }
    }
  }, [scrollTo]);

  return (
    <RHHCApolloPage
      uri="/search"
      className="pageLayout"
      navigation={<Navigation />}
      content={
        <SearchPage
          SearchComponent={AdvancedSearch}
          pageTitle={"eventSearch.title"}
        />
      }
      footer={<footer>TODO: footer</footer>}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getHobbiesStaticProps(context, async () => {
    const locale = context.locale ?? context.defaultLocale ?? DEFAULT_LANGUAGE;

    return {
      props: {
        ...(await serverSideTranslationsWithCommon(getLocaleOrError(locale), [
          "search_page",
          "search_header",
          "search_page_search_form",
          "search_list",
          "multi_select_combobox",
        ])),
      },
    };
  });
}
