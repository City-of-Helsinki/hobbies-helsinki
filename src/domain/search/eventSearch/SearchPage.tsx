import { useTranslation } from "next-i18next";
import React from "react";
import { scroller } from "react-scroll";
import { toast } from "react-toastify";
import qs from "query-string";

import eventsApolloClient from "../../clients/eventsApolloClient";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import SrOnly from "../../../common/components/srOnly/SrOnly";
import useIsSmallScreen from "../../../common/hooks/useIsSmallScreen";
import useLocale from "../../../common-events/hooks/useLocale";
import useRouter from "../../../common-events/i18n/router/useRouter";
import {
  QueryEventListArgs,
  useEventListQuery,
} from "../../nextApi/graphql/generated/graphql";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "./constants";
import SearchResultsContainer from "./searchResultList/SearchResultsContainer";
import { getEventSearchVariables, getNextPage } from "./utils";
import { removeQueryParamsFromRouter } from "../../../common-events/i18n/router/utils";
import { getLargeEventCardId } from "../../event/EventUtils";
import EventList from "../../../common-events/components/eventList/EventList";
import styles from "./eventSearchPage.module.scss";

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    "data-testid"?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;

  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(qs.stringify(router.query));
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ["keywords", "location"],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.START_TIME,
      superEventType: ["umbrella", "none"],
    });
    return variables;
  }, [locale, router.query, params.place]);

  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
  } = useEventListQuery({
    client: eventsApolloClient,
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters,
  });

  const eventsList = eventsData?.eventList;

  const handleLoadMore = async () => {
    const page = eventsData?.eventList.meta
      ? getNextPage(eventsData.eventList.meta)
      : null;

    setIsFetchingMore(true);

    if (page) {
      try {
        await fetchMore({
          variables: {
            page,
          },
        });
      } catch (e) {
        toast.error(t("eventSearch:errorLoadMode"));
      }
    }
    setIsFetchingMore(false);
  };

  const scrollToResultList = () => {
    if (isSmallScreen) {
      scroller.scrollTo("resultList", {
        delay: 0,
        duration: 1000,
        offset: -50,
        smooth: true,
      });
    }
  };

  const scrollToEventCard = (id: string) => {
    scroller.scrollTo(id, {
      delay: 0,
      duration: 300,
      offset: -50,
      smooth: true,
    });
  };

  React.useEffect(() => {
    if (router.asPath && router.query?.scrollToResults) {
      scrollToResultList();
    } else if (router.query?.eventId) {
      scrollToEventCard(
        getLargeEventCardId(
          Array.isArray(router.query.eventId)
            ? router.query.eventId[0]
            : router.query.eventId
        )
      );
      removeQueryParamsFromRouter(router, ["eventId"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.eventSearchPageWrapper}>
      <SrOnly as="h1">{t(pageTitle)}</SrOnly>
      <SearchComponent
        scrollToResultList={scrollToResultList}
        data-testid="searchContainer"
      />
      <div
        className={styles.resultList}
        id="resultList"
        data-testid="resultList"
      >
        <SrOnly aria-live="polite" aria-atomic={true}>
          {isLoadingEvents
            ? t("eventSearch:ariaLiveLoading")
            : t("eventSearch:ariaLiveSearchReady", {
                count: eventsList?.meta.count,
              })}
        </SrOnly>
        <LoadingSpinner isLoading={!isFetchingMore && isLoadingEvents}>
          {eventsList && (
            <SearchResultsContainer
              eventsCount={eventsList.meta.count}
              loading={isLoadingEvents}
              eventList={
                <EventList
                  cardSize="large"
                  events={eventsList.data}
                  hasNext={!!eventsList.meta.next}
                  count={eventsList.meta.count}
                  loading={isLoadingEvents}
                  onLoadMore={handleLoadMore}
                />
              }
            />
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default SearchPage;
