import React from 'react';

import useLocale from '../../common-events/hooks/useLocale';
import getLocalisedString from '../../common-events/utils/getLocalisedString';
import { usePlaceDetailsQuery } from '../nextApi/graphql/generated/graphql';

interface Props {
  id: string;
}

const PlaceText: React.FC<Props> = ({ id }) => {
  const locale = useLocale();
  const { data } = usePlaceDetailsQuery({
    variables: { id },
  });

  return (
    <>{getLocalisedString((data && data.placeDetails.name) || {}, locale)}</>
  );
};

export default PlaceText;
