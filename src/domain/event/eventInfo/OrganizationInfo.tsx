import { IconFaceSmile, IconLayers } from "hds-react";
import { useTranslation } from "next-i18next";
import React from "react";

import InfoWithIcon from "../../../common-events/components/infoWithIcon/InfoWithIcon";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import useLocale from "../../../common-events/hooks/useLocale";
import Link from "../../../common-events/i18n/router/Link";
import {
  EventFieldsFragment,
  useOrganizationDetailsQuery,
} from "../../nextApi/graphql/generated/graphql";
import { getEventFields } from "../EventUtils";

interface Props {
  event: EventFieldsFragment;
}

const OrganizationInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    ssr: false,
    variables: { id: publisher },
  });

  const organizationName = organizationData?.organizationDetails.name;

  return (
    <>
      {provider && (
        <InfoWithIcon
          icon={<IconFaceSmile />}
          title={t("event.info.labelOrganizer")}
        >
          <div>{provider}</div>
        </InfoWithIcon>
      )}
      {publisher && (
        <InfoWithIcon
          icon={<IconLayers />}
          title={t("event.info.labelPublisher")}
        >
          <LoadingSpinner hasPadding={false} isLoading={loading}>
            {organizationName && (
              <>
                <div>{organizationName}</div>
                <Link href={`/search/?publisher=${publisher}`}>
                  {t(`event.info.linkSearchByPublisher`)}
                </Link>
              </>
            )}
          </LoadingSpinner>
        </InfoWithIcon>
      )}
    </>
  );
};

export default OrganizationInfo;
