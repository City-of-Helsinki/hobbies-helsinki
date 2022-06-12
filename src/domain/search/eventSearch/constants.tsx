import React from "react";

import IconCraft from "../../../assets/icons/IconCraft";
import IconDance from "../../../assets/icons/IconDance";
import IconFood from "../../../assets/icons/IconFood";
import IconGames from "../../../assets/icons/IconGames";
import IconArt from "../../../assets/icons/IconLanguages";
import IconLanguages from "../../../assets/icons/IconLanguages";
import IconLiterature from "../../../assets/icons/IconLiterature";
import IconMovies from "../../../assets/icons/IconMovies";
import IconMusic from "../../../assets/icons/IconMusic";
import IconSports from "../../../assets/icons/IconSports";
import IconTheatre from "../../../assets/icons/IconTheatre";
import { EventTypeId } from "../../nextApi/graphql/generated/graphql";
import { Filters, SearchCategoryOption } from "./types";

// Page size of the event list
export const PAGE_SIZE = 10;

export enum COURSE_CATEGORIES {
  MOVIE = "movie_and_media",
  LANGUAGES = "languages",
  LITERATURE = "literature",
  ARTS_AND_CULTURE = "arts_and_culture",
  VISUAL_ARTS = "visual_arts",
  HANDICRAFTS = "handicrafts",
  SPORT = "sport",
  MUSIC = "music",
  GAMES = "games",
  FOOD = "food",
  DANCE = "dance",
  THEATRE = "theatre",
}

export enum COURSE_HOBBY_TYPES {
  CLUBS = "clubs",
  COURSES = "courses",
  CAMPS = "camps",
  TRIPS = "trips",
  WORKSHOPS = "workshops",
  ONLINE_STUDIES = "online_studies",
}

// TODO: Remove these since they should not be needed when the general events are not used at all.
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

export const COURSE_DEFAULT_SEARCH_FILTERS = {
  categories: [],
  hobbyTypes: [],
  dateTypes: [],
  divisions: [],
  end: null,
  isFree: false,
  alsoOngoingCourses: false,
  places: [],
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
  [EventTypeId.Course]: {
    default: [
      COURSE_CATEGORIES.MOVIE,
      COURSE_CATEGORIES.LANGUAGES,
      COURSE_CATEGORIES.LITERATURE,
      COURSE_CATEGORIES.ARTS_AND_CULTURE,
      COURSE_CATEGORIES.VISUAL_ARTS,
      COURSE_CATEGORIES.HANDICRAFTS,
      COURSE_CATEGORIES.SPORT,
      COURSE_CATEGORIES.MUSIC,
      COURSE_CATEGORIES.GAMES,
      COURSE_CATEGORIES.FOOD,
      COURSE_CATEGORIES.DANCE,
      COURSE_CATEGORIES.THEATRE,
    ],
    landingPage: [
      COURSE_CATEGORIES.LITERATURE,
      COURSE_CATEGORIES.VISUAL_ARTS,
      COURSE_CATEGORIES.HANDICRAFTS,
      COURSE_CATEGORIES.SPORT,
      COURSE_CATEGORIES.MUSIC,
      COURSE_CATEGORIES.GAMES,
      COURSE_CATEGORIES.DANCE,
      COURSE_CATEGORIES.THEATRE,
    ],
  },
  hobbyTypes: {
    default: [
      COURSE_HOBBY_TYPES.CLUBS,
      COURSE_HOBBY_TYPES.COURSES,
      COURSE_HOBBY_TYPES.CAMPS,
      COURSE_HOBBY_TYPES.TRIPS,
      COURSE_HOBBY_TYPES.WORKSHOPS,
    ],
    landingPage: [COURSE_HOBBY_TYPES.CLUBS, COURSE_HOBBY_TYPES.CAMPS],
  },
};

export const MOVIES_AND_MEDIA_COURSES_KEYWORDS = [
  "yso:p1235", //elokuva
  "kulke:29", //elokuvat
  "yso:p16327", //media
  "kulke:205", //mediataide
  "yso:p9731", //valokuva
  "kulke:87", //valokuvaus
  "yso:p1979", //?
];

export const LANGUAGES_COURSES_KEYWORDS = [
  "yso:p556", //kielet
  "yso:p38117", //kieltenopetus
];

export const LITERATURE_COURSES_KEYWORDS = [
  //sanataide, kirjallisuus, sarjakuva
  "yso:p8113",
  "yso:p7969",
  "kulke:81",
  "yso:p38773",
];

export const ARTS_AND_CULTURE_COURSES_KEYWORDS = [
  "yso:p2625",
  "yso:p27886",
  "yso:p2315",
  "yso:p16164",
  "yso:p9058",
  "kulke:51",
  "yso:p1235",
  "kulke:29",
  "yso:p16327",
  "kulke:205",
  "yso:p973",
  "yso:p2851",
  "yso:p1148",
  "yso:p38773",
  "yso:p695",
  "yso:p1808",
  "yso:p10871",
  "yso:p20421",
  "yso:p2969",
  "yso:p23171",
  "yso:p27962",
  "yso:p18718",
  "yso:p18434",
  "yso:p15521",
  "yso:p13408",
  "yso:p29932",
  "yso:p768",
  "yso:p2841",
  "yso:p6283",
  "yso:p1278",
  "yso:p10105",
  "yso:p3984",
  "yso:p25118",
  "yso:p10218",
  "yso:p21524",
  "yso:p37874",
  "yso:p1780",
];

export const VISUAL_ARTS_COURSES_KEYWORDS = [
  "kulke:81",
  "yso:p1148",
  "yso:p38773",
  "yso:p8883",
  "yso:p695",
];

export const HANDICRAFTS_COURSES_KEYWORDS = [
  "yso:p4923",
  "yso:p485",
  "kulke:668",
  "yso:p8630",
];

export const SPORT_COURSES_KEYWORDS = [
  "yso:p916",
  "kulke:710",
  "yso:p17018",
  "yso:p1963",
  "yso:p9824",
  "yso:p965",
  "yso:p6409",
  "yso:p8781",
  "yso:p26619",
  "yso:p13035",
  "yso:p2041",
];

export const MUSIC_COURSES_KEYWORDS = [
  "yso:p1808",
  "yso:p10871",
  "yso:p20421",
  "yso:p2969",
  "yso:p23171",
  "yso:p27962",
  "yso:p18718",
  "yso:p18434",
  "yso:p15521",
  "yso:p13408",
  "yso:p29932",
  "yso:p768",
  "yso:p2841",
];

export const GAMES_COURSES_KEYWORDS = [
  "yso:p6062",
  "yso:p2758",
  "yso:p21628",
  "yso:p17281",
  "yso:p22610",
  "yso:p4295",
  "yso:p7990",
];

export const FOOD_COURSES_KEYWORDS = ["yso:p367", "yso:p5529", "yso:p28276"];

export const DANCE_COURSES_KEYWORDS = [
  "yso:p6283",
  "yso:p1278",
  "yso:p10105",
  "yso:p3984",
  "yso:p25118",
  "yso:p10218",
  "yso:p21524",
  "yso:p37874",
];

export const THEATRE_COURSES_KEYWORDS = [
  "yso:p2625",
  "yso:p27886",
  "yso:p2315",
  "yso:p16164",
  "yso:p9058",
];

//todo: replace with valid keyword ids
export const MAPPED_COURSE_CATEGORIES: Record<string, string[]> = {
  [COURSE_CATEGORIES.MOVIE]: MOVIES_AND_MEDIA_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.LANGUAGES]: LANGUAGES_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.LITERATURE]: LITERATURE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.ARTS_AND_CULTURE]: ARTS_AND_CULTURE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.VISUAL_ARTS]: VISUAL_ARTS_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.HANDICRAFTS]: HANDICRAFTS_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.SPORT]: SPORT_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.MUSIC]: MUSIC_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.GAMES]: GAMES_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.FOOD]: FOOD_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.DANCE]: DANCE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.THEATRE]: THEATRE_COURSES_KEYWORDS,
};

export const courseCategories: Record<COURSE_CATEGORIES, SearchCategoryOption> =
  {
    [COURSE_CATEGORIES.MOVIE]: {
      icon: <IconMovies />,
      labelKey: "home.category.courses.movieAndMedia",
    },
    [COURSE_CATEGORIES.LANGUAGES]: {
      icon: <IconLanguages />,
      labelKey: "home.category.courses.languages",
    },
    [COURSE_CATEGORIES.LITERATURE]: {
      icon: <IconLiterature />,
      labelKey: "home.category.courses.literature",
    },
    [COURSE_CATEGORIES.ARTS_AND_CULTURE]: {
      icon: <IconArt />,
      labelKey: "home.category.courses.artsAndCulture",
    },
    [COURSE_CATEGORIES.VISUAL_ARTS]: {
      icon: <IconArt />,
      labelKey: "home.category.courses.visualArts",
    },
    [COURSE_CATEGORIES.HANDICRAFTS]: {
      icon: <IconCraft />,
      labelKey: "home.category.courses.handicrafts",
    },
    [COURSE_CATEGORIES.SPORT]: {
      icon: <IconSports />,
      labelKey: "home.category.courses.sport",
    },
    [COURSE_CATEGORIES.MUSIC]: {
      icon: <IconMusic />,
      labelKey: "home.category.courses.music",
    },
    [COURSE_CATEGORIES.GAMES]: {
      icon: <IconGames />,
      labelKey: "home.category.courses.games",
    },
    [COURSE_CATEGORIES.FOOD]: {
      icon: <IconFood />,
      labelKey: "home.category.courses.food",
    },
    [COURSE_CATEGORIES.DANCE]: {
      icon: <IconDance />,
      labelKey: "home.category.courses.dance",
    },
    [COURSE_CATEGORIES.THEATRE]: {
      icon: <IconTheatre />,
      labelKey: "home.category.courses.theatre",
    },
  };

export const MAPPED_PLACES: Record<string, string> = {};
