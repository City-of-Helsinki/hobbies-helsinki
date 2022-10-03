import sortBy from 'lodash/sortBy';
import { getLocalizedString } from 'events-helsinki-components'
import { useLocale } from 'events-helsinki-components'

import { additionalDivisions } from '../../domain/neighborhood/additionalDivisions';
import {
  Neighborhood,
  useNeighborhoodListQuery,
} from '../../domain/nextApi/graphql/generated/graphql';

export const DIVISION_BLOCKLIST = [
  'kaupunginosa:aluemeri',
  'kaupunginosa:ultuna',
];

type DivisionOption = {
  text: string;
  value: string;
};

const useDivisionOptions = (): DivisionOption[] => {
  const locale = useLocale();
  const { data: neighborhoodsData } = useNeighborhoodListQuery();
  const filteredNeighborhoodList = getFilteredNeighborhoodList(
    neighborhoodsData?.neighborhoodList.data
  );
  const neighborhoodList = [
    ...filteredNeighborhoodList,
    ...additionalDivisions,
  ];

  const neighborhoodOptionList =
    neighborhoodList?.map((neighborhood: Neighborhood) => ({
      text: getLocalizedString(neighborhood.name, locale),
      value: neighborhood.id,
    })) ?? [];

  return sortBy(neighborhoodOptionList, 'text');
};

export const getFilteredNeighborhoodList = (
  data: Neighborhood[] | undefined
): Neighborhood[] => {
  return (
    data?.filter((option) => !DIVISION_BLOCKLIST.includes(option.id)) ?? []
  );
};

export default useDivisionOptions;
