import { IconFaceSmile, IconLayers } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import { ROUTES } from 'events-helsinki-core';
import { InfoWithIcon, LoadingSpinner, useLocale } from 'events-helsinki-components';

import styles from './eventInfo.module.scss';
import {
  EventFieldsFragment,
  useOrganizationDetailsQuery,
} from '../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../EventUtils';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';

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
          title={t('event:info.labelOrganizer')}
        >
          <div>{provider}</div>
        </InfoWithIcon>
      )}
      {publisher && (
        <InfoWithIcon
          icon={<IconLayers />}
          title={t('event:info.labelPublisher')}
        >
          <LoadingSpinner hasPadding={false} isLoading={loading}>
            {organizationName && (
              <>
                <div>{organizationName}</div>
                <SecondaryLink
                  className={styles.link}
                  variant="arrowRight"
                  href={`${getLocalizedCmsItemUrl(
                    ROUTES.SEARCH,
                    {},
                    locale
                  )}?publisher=${publisher}`}
                >
                  {t(`event:info.linkSearchByPublisher`)}
                </SecondaryLink>
              </>
            )}
          </LoadingSpinner>
        </InfoWithIcon>
      )}
    </>
  );
};

export default OrganizationInfo;
