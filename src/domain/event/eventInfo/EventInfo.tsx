import * as Sentry from "@sentry/browser";
import { saveAs } from "file-saver";
import {
  Button,
  IconAngleRight,
  IconCalendarClock,
  IconGlobe,
  IconGroup,
  IconInfoCircle,
  IconLocation,
  IconTicket,
} from "hds-react";
import { createEvent, EventAttributes } from "ics";
import { useTranslation } from "next-i18next";
import React from "react";

import InfoWithIcon from "../../../common-events/components/infoWithIcon/InfoWithIcon";
import getDateRangeStr from "../../../common-events/utils/getDateRangeStr";
import useLocale from "../../../common-events/hooks/useLocale";
import linkStyles from "../../../common-events/components/link/link.module.scss";
import {
  getAudienceAgeText,
  getEventFields,
  getEventPrice,
  getServiceMapUrl,
} from "../EventUtils";
import { EventFields, KeywordOption, SuperEventResponse } from "../types";
import styles from "./eventInfo.module.scss";
import { SubEvents, SuperEvent } from "./EventsHierarchy";
import OrganizationInfo from "./OrganizationInfo";
import OtherEventTimes from "./OtherEventTimes";
import Visible from "../../../common/components/visible/Visible";
import { translateValue } from "../../../common-events/utils/translateUtils";
import IconDirections from "../../../assets/icons/IconDirections";
import useTabFocusStyle from "../../../common/hooks/useTabFocusStyle";
import getDateArray from "../../../common-events/utils/getDateArray";
import useRouter from "../../../common-events/i18n/router/useRouter";
import Link from "../../../common-events/components/link/Link";

interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
}

const EventInfo: React.FC<Props> = ({ event, superEvent }) => {
  const locale = useLocale();
  const eventInfoContainer = React.useRef<HTMLDivElement | null>(null);
  useTabFocusStyle({
    container: eventInfoContainer,
    className: styles.focusVisible,
  });
  const {
    email,
    externalLinks,
    infoUrl,
    languages,
    telephone,
    audience,
    audienceMinAge,
    audienceMaxAge,
  } = getEventFields(event, locale);
  const showOtherInfo = Boolean(
    email || externalLinks.length || infoUrl || telephone
  );

  /* 
  Middle level events are all the events that have super event and subEvents
  Then the so called sibbling events (the events that have the same super event)
  are not wanted to be seen. 
  */
  const isMiddleLevelEvent = Boolean(superEvent && event.subEvents?.length);

  return (
    <div className={styles.eventInfo} ref={eventInfoContainer}>
      <div className={styles.contentWrapper}>
        <DateInfo event={event} />
        <SuperEvent superEvent={superEvent} />
        <SubEvents event={event} />
        {!isMiddleLevelEvent && <OtherEventTimes event={event} />}
        <LocationInfo event={event} />
        {(!!audience.length || !!audienceMinAge || !!audienceMaxAge) && (
          <Audience
            audience={audience}
            audienceMinAge={audienceMinAge}
            audienceMaxAge={audienceMaxAge}
          />
        )}
        {!!languages.length && <Languages languages={languages} />}
        {showOtherInfo && <OtherInfo event={event} />}
        <Directions event={event} />
        <OrganizationInfo event={event} />
        <PriceInfo event={event} />
      </div>
    </div>
  );
};

const DateInfo: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();

  const {
    addressLocality,
    district,
    endTime,
    locationName,
    name,
    shortDescription,
    startTime,
    streetAddress,
  } = getEventFields(event, locale);

  const downloadIcsFile = () => {
    if (startTime) {
      const domain = router.basePath;
      const icsEvent: EventAttributes = {
        description: t("event.info.textCalendarLinkDescription", {
          description: shortDescription,
          link: `${domain}/${locale}/courses/${event.id}}`,
        }),
        end: endTime ? getDateArray(endTime) : getDateArray(startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(", "),
        productId: domain,
        start: getDateArray(startTime),
        startOutputType: "local",
        title: name,
      };
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          Sentry.captureException(error);
        } else {
          const blob = new Blob([value], { type: "text/calendar" });
          saveAs(blob, `event_${event.id.replace(/:/g, "")}.ics`);
        }
      });
    }
  };

  return (
    <InfoWithIcon
      icon={<IconCalendarClock aria-hidden />}
      title={t("event.info.labelDateAndTime")}
    >
      {!!startTime && (
        <>
          {getDateRangeStr({
            start: startTime,
            end: endTime,
            locale,
            includeTime: true,
            timeAbbreviation: t("commons.timeAbbreviation"),
          })}
          <button className={linkStyles.link} onClick={downloadIcsFile}>
            {t("event.info.buttonAddToCalendar")}
            <IconAngleRight aria-hidden />
          </button>
        </>
      )}
    </InfoWithIcon>
  );
};

const LocationInfo: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { addressLocality, district, locationName, streetAddress } =
    getEventFields(event, locale);

  const serviceMapUrl = getServiceMapUrl(event, locale, false);

  return (
    <InfoWithIcon
      icon={<IconLocation aria-hidden />}
      title={t("event.info.labelLocation")}
    >
      <Visible below="s">
        {[locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(", ")}
      </Visible>
      <Visible above="s">
        {[locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .map((item) => {
            return <div key={item}>{item}</div>;
          })}
      </Visible>
      {serviceMapUrl && (
        <Link isExternal={true} to={serviceMapUrl} t={t}>
          {t("event.info.openMap")}
        </Link>
      )}
    </InfoWithIcon>
  );
};

const Audience: React.FC<{
  audience: KeywordOption[];
  audienceMinAge?: string | null;
  audienceMaxAge?: string | null;
}> = ({ audience, audienceMinAge, audienceMaxAge }) => {
  const { t } = useTranslation();

  return (
    <InfoWithIcon icon={<IconGroup />} title={t("event.info.labelAudience")}>
      {(audienceMinAge || audienceMaxAge) && (
        <div>{getAudienceAgeText(t, audienceMinAge, audienceMaxAge)}</div>
      )}
      {audience.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </InfoWithIcon>
  );
};

const Languages: React.FC<{ languages: string[] }> = ({ languages }) => {
  const { t } = useTranslation();

  return (
    <InfoWithIcon
      icon={<IconGlobe aria-hidden />}
      title={t("event.info.labelLanguages")}
    >
      <div>{languages.join(", ")}</div>
    </InfoWithIcon>
  );
};

const OtherInfo: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const { email, externalLinks, infoUrl, telephone, registrationUrl } =
    getEventFields(event, locale);

  return (
    <InfoWithIcon
      icon={<IconInfoCircle aria-hidden />}
      title={t("event.info.labelOtherInfo")}
    >
      {[email, telephone]
        .filter((e) => e)
        .map((item) => (
          <div key={item}>{item}</div>
        ))}

      {infoUrl && (
        <Link isExternal={true} to={infoUrl} t={t}>
          {t("event.info.linkWebPage")}
        </Link>
      )}
      {externalLinks.map((externalLink: any, index: number) => {
        return (
          !!externalLink.link &&
          externalLink.link !== registrationUrl && (
            <Link key={index} isExternal={true} to={externalLink.link} t={t}>
              {translateValue("event.info.", externalLink.name as string, t)}
            </Link>
          )
        );
      })}
    </InfoWithIcon>
  );
};

const Directions: React.FC<{
  event: EventFields;
}> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const { googleDirectionsLink, hslDirectionsLink } = getEventFields(
    event,
    locale
  );

  return (
    <InfoWithIcon
      icon={<IconDirections aria-hidden />}
      title={t("event.info.labelDirections")}
    >
      <Link isExternal={true} to={googleDirectionsLink} t={t}>
        {t("event.info.directionsGoogle")}
      </Link>
      <Link isExternal={true} to={hslDirectionsLink} t={t}>
        {t("event.info.directionsHSL")}
      </Link>
    </InfoWithIcon>
  );
};

const PriceInfo: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const eventPriceText = getEventPrice(
    event,
    locale,
    t("event.info.offers.isFree")
  );
  const { offerInfoUrl } = getEventFields(event, locale);
  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };
  return (
    <>
      {/* Price info */}
      <Visible below="s">
        <InfoWithIcon
          icon={<IconTicket aria-hidden />}
          title={t("event.info.labelPrice")}
        >
          {eventPriceText || "-"}
        </InfoWithIcon>
      </Visible>

      {offerInfoUrl && (
        <Visible below="s" className={styles.buyButtonWrapper}>
          <Button
            aria-label={t("event.info.ariaLabelBuyTickets")}
            fullWidth={true}
            onClick={moveToBuyTicketsPage}
            variant="success"
          >
            {t("event.info.buttonBuyTickets")}
          </Button>
        </Visible>
      )}
    </>
  );
};

export default EventInfo;
