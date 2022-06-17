import classNames from "classnames";
import { Button } from "hds-react";
import { useTranslation } from "next-i18next";
import React from "react";

import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import BasicEventCard from "../../../domain/event/eventCard/EventCard";
import LargeEventCard from "../../../domain/event/eventCard/LargeEventCard";
import { EventFields } from "../../../domain/event/types";
import { EventFieldsFragment } from "../../../domain/nextApi/graphql/generated/graphql";
import styles from "./eventList.module.scss";

const eventCardsMap = {
  default: BasicEventCard,
  large: LargeEventCard, // TODO: ADD LargeEventCard,
};

interface Props {
  buttonCentered?: boolean;
  cardSize?: "default" | "large";
  events: EventFieldsFragment[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = "default",
  events,
  loading,
  count,
  hasNext,
  onLoadMore,
}) => {
  const { t } = useTranslation();
  const eventsLeft = count - events.length;
  const EventCard = eventCardsMap[cardSize];

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>
        {(events as EventFields[]).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
          {hasNext && (
            <Button onClick={onLoadMore} variant="success">
              {t("eventSearch:buttonLoadMore", { count: eventsLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default EventList;
