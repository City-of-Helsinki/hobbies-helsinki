import { useTranslation } from 'next-i18next';
import React from 'react';
import { FilterType } from 'events-helsinki-components';
import { FilterButton } from 'events-helsinki-components';

import { useOrganizationDetailsQuery } from '../../../nextApi/graphql/generated/graphql';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PublisherFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation();
  const { data, loading } = useOrganizationDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('common:loading')}
      type="publisher"
      value={id}
    />
  ) : data && data.organizationDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={data.organizationDetails.name}
      type="publisher"
      value={id}
    />
  ) : null;
};

export default PublisherFilter;
