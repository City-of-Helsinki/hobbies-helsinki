import React from "react";

import { getI18nPath } from "../../../domain/i18n/router/utils";
import useLocale from "../../hooks/useLocale";
import CategoryLink from "../link/CategoryLink";
import List from "../list/List";

type Shortcut = {
  id: string;
  label: string;
  icon: React.ReactNode;
  ontologyTreeIds: string[];
};

type Props = {
  shortcuts: Shortcut[];
};

function SearchShortcuts({ shortcuts }: Props) {
  const locale = useLocale();
  return (
    <List
      variant="fixed-grid-4"
      gap="s"
      items={shortcuts.map((shortcut) => (
        <CategoryLink
          key={shortcut.id}
          label={shortcut.label}
          icon={shortcut.icon}
          href={`${getI18nPath(
            "/search",
            locale
          )}${shortcut.ontologyTreeIds.reduce(
            (acc, id, i) => `${acc}${i === 0 ? "?" : "&"}ontologyTreeIds=${id}`,
            ""
          )}`}
        />
      ))}
    />
  );
}

export default SearchShortcuts;
