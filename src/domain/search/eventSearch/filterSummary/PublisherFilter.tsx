import { useTranslation } from "next-i18next";
import React from "react";

import FilterButton from "../../../../common/components/filterButton/FilterButton";
import { FilterType } from "../../../../common/components/filterButton/types";
import { useOrganizationDetailsQuery } from "../../../nextApi/graphql/generated/graphql";

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
      text={t("commons.loading")}
      type="publisher"
      value={id}
      t={t}
    />
  ) : data && data.organizationDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={data.organizationDetails.name}
      type="publisher"
      value={id}
      t={t}
    />
  ) : null;
};

export default PublisherFilter;
