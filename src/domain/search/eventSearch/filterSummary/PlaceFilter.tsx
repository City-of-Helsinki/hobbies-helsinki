import { useTranslation } from 'next-i18next';
import React from 'react';

import FilterButton from '../../../../common-events/components/filterButton/FilterButton';
import { FilterType } from '../../../../common-events/components/filterButton/types';
import getLocalisedString from '../../../../common-events/utils/getLocalisedString';
import useLocale from '../../../../hooks/useLocale';
import { usePlaceDetailsQuery } from '../../../nextApi/graphql/generated/graphql';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PlaceFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data, loading } = usePlaceDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('common:loading')}
      type="place"
      value={id}
    />
  ) : data && data.placeDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalisedString(data.placeDetails.name, locale)}
      type="place"
      value={id}
    />
  ) : null;
};

export default PlaceFilter;
