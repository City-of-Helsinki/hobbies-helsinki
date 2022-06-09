import React, { useRef } from "react";
import { GetStaticPropsContext } from "next";
// import { Koros } from "hds-react";
import { useEffect } from "react";
import { Page as RHHCApolloPage } from "react-helsinki-headless-cms/apollo";
// import { scroller } from "react-scroll";

import getHobbiesStaticProps from "../../domain/app/getHobbiesStaticProps";
import useRouter from "../../domain/i18n/router/useRouter";
import serverSideTranslationsWithCommon from "../../domain/i18n/serverSideTranslationsWithCommon";
import { getLocaleOrError } from "../../domain/i18n/router/utils";
// import Section from "../../common/components/section/Section";
// import styles from "./search.module.scss";
import { DEFAULT_LANGUAGE } from "../../constants";
import AdvancedSearch from "../../domain/search/eventSearch/AdvancedSearch";
// import useIsSmallScreen from "../../common/hooks/useIsSmallScreen";
import Navigation from "../../common-events/components/navigation/Navigation";
import SearchPage from "../../domain/search/eventSearch/SearchPage";

export default function Search() {
  const router = useRouter();
  const scrollTo = router.query?.scrollTo;
  const listRef = useRef<HTMLUListElement | null>(null);
  // const isSmallScreen = useIsSmallScreen();

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

  // const scrollToResultList = () => {
  //   if (isSmallScreen) {
  //     scroller.scrollTo("resultList", {
  //       delay: 0,
  //       duration: 1000,
  //       offset: -50,
  //       smooth: true,
  //     });
  //   }
  // };

  return (
    <RHHCApolloPage
      uri="/search"
      className="pageLayout"
      navigation={<Navigation />}
      content={
        // <>
        //   <AdvancedSearch
        //     scrollToResultList={scrollToResultList}
        //     data-testid="searchContainer"
        //   />
        //   <Section variant="contained">
        //     <Koros className={styles.koros} />
        //     <div>TODO: Search results</div>
        //   </Section>
        // </>
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
