import React from "react";

import AdvancedSearch from "./AdvancedSearch";
import SearchPage from "./SearchPage";

const EventSearchPageContainer: React.FC = () => (
  <SearchPage SearchComponent={AdvancedSearch} pageTitle="search:title" />
);

export default EventSearchPageContainer;
