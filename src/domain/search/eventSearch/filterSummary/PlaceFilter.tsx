import { useTranslation } from "next-i18next";
import React from "react";

import FilterButton from "../../../../common/components/filterButton/FilterButton";
import { FilterType } from "../../../../common/components/filterButton/types";
import useLocale from "../../../../common/hooks/useLocale";
import getLocalisedString from "../../../../common/utils/getLocalisedString";
import { usePlaceDetailsQuery } from "../../../nextApi/graphql/generated/graphql";

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
      text={t("commons.loading")}
      type="place"
      value={id}
      t={t}
    />
  ) : data && data.placeDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalisedString(data.placeDetails.name, locale)}
      type="place"
      value={id}
      t={t}
    />
  ) : null;
};

export default PlaceFilter;
