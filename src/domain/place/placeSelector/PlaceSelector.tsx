import React from 'react';
import { MultiSelectDropdown, useDebounce, useLocale } from 'events-helsinki-components';
import { getLocalizedString, isClient } from 'events-helsinki-core';
import {
  MultiselectDropdownProps
} from 'events-helsinki-components';

import PlaceText from '../PlaceText';
import { usePlaceListQuery } from '../../nextApi/graphql/generated/graphql';

const DIVISIONS = ['kunta:helsinki'];

const { getPlaceDetailsFromCache } = isClient
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../utils')
  : /* istanbul ignore next */
    { getPlaceDetailsFromCache: null };

type Props = Omit<MultiselectDropdownProps, 'options'>;

const PlaceSelector: React.FC<Props> = ({
  inputValue,
  setInputValue,
  ...props
}) => {
  const locale = useLocale();
  const [internalInputValue, setInternalInputValue] = React.useState('');
  const input = inputValue !== undefined ? inputValue : internalInputValue;
  const searchValue = useDebounce(input, 300);

  const { data: placesData } = usePlaceListQuery({
    skip: !searchValue,
    variables: {
      divisions: DIVISIONS,
      hasUpcomingEvents: true,
      pageSize: 10,
      // Seems like apollo can get stuck in loading when searched with different casings
      text: searchValue.toLowerCase(),
    },
  });

  const placeOptions = React.useMemo(() => {
    return (placesData?.placeList.data || [])
      .map((place) => ({
        text: getLocalizedString(place.name, locale),
        value: place.id as string,
      }))
      .sort((a, b) => (a.text > b.text ? 1 : -1));
  }, [locale, placesData]);

  const renderOptionText = (id: string) => {
    try {
      const place = getPlaceDetailsFromCache(id);
      return getLocalizedString(place.placeDetails.name, locale);
    } catch {
      return <PlaceText id={id} />;
    }
  };

  return (
    <MultiSelectDropdown
      {...props}
      inputValue={input}
      options={placeOptions}
      renderOptionText={renderOptionText}
      setInputValue={setInputValue || setInternalInputValue}
    />
  );
};

export default PlaceSelector;
