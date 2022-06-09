import React from "react";

import { Filters, SearchCategoryOption } from "./types";

// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_CATEGORIES {
  NATURE = "nature",
  SPORT = "sport",
}

export const EVENT_DEFAULT_SEARCH_FILTERS: Filters = {
  categories: [],
  dateTypes: [],
  divisions: [],
  end: null,
  isFree: false,
  keyword: [],
  keywordNot: [],
  places: [],
  publisher: null,
  start: null,
  text: [],
  suitableFor: [],
};

export enum EVENT_SORT_OPTIONS {
  DURATION = "duration",
  DURATION_DESC = "-duration",
  END_TIME = "end_time",
  END_TIME_DESC = "-end_time",
  LAST_MODIFIED_TIME = "last_modified_time",
  LAST_MODIFIED_TIME_DESC = "-last_modified_time",
  START_TIME = "start_time",
  START_TIME_DESC = "-start_time",
}

export enum EVENT_SEARCH_FILTERS {
  CATEGORIES = "categories",
  DATE_TYPES = "dateTypes",
  DIVISIONS = "divisions",
  END = "end",
  IS_FREE = "isFree",
  KEYWORD = "keyword",
  KEYWORD_NOT = "keywordNot",
  ONLY_CHILDREN_EVENTS = "onlyChildrenEvents",
  ONLY_EVENING_EVENTS = "onlyEveningEvents",
  ONLY_REMOTE_EVENTS = "onlyRemoteEvents",
  PAGE = "page",
  PLACES = "places",
  PUBLISHER = "publisher",
  START = "start",
  TEXT = "text",
  MIN_AGE = "audienceMinAgeGt",
  MAX_AGE = "audienceMaxAgeLt",
  SUITABLE = "suitableFor",
}

export const CATEGORY_CATALOG = {
  //TODO: Use EventTypeId
  ["general"]: {
    default: [EVENT_CATEGORIES.SPORT, EVENT_CATEGORIES.NATURE],
  },
};

export const SPORT_KEYWORDS = [
  "yso:p916", // Liikunta
  "yso:p965", // Urheilu
];

export const NATURE_KEYWORDS = ["yso:p2771"];

export const MAPPED_EVENT_CATEGORIES: Record<string, string[]> = {
  [EVENT_CATEGORIES.SPORT]: SPORT_KEYWORDS,
  [EVENT_CATEGORIES.NATURE]: NATURE_KEYWORDS,
};

export const eventCategories: Record<EVENT_CATEGORIES, SearchCategoryOption> = {
  [EVENT_CATEGORIES.SPORT]: {
    icon: <></>,
    labelKey: "home.category.sport",
  },
  [EVENT_CATEGORIES.NATURE]: {
    icon: <></>,
    labelKey: "home.category.nature",
  },
};

export const MAPPED_PLACES: Record<string, string> = {};
