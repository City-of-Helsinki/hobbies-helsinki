import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AboutPagesResponse = {
  __typename?: 'AboutPagesResponse';
  data: Array<StaticPage>;
};

export type AccessibilityPagesResponse = {
  __typename?: 'AccessibilityPagesResponse';
  data: Array<StaticPage>;
};

export type Audience = {
  __typename?: 'Audience';
  id?: Maybe<Scalars['ID']>;
  internalContext?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
};

export type BannerPage = {
  __typename?: 'BannerPage';
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageColor?: Maybe<LocalizedObject>;
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>;
  heroTopLayerImage?: Maybe<LocalizedCmsImage>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  socialMediaImage?: Maybe<LocalizedCmsImage>;
  title?: Maybe<LocalizedObject>;
  titleAndDescriptionColor?: Maybe<LocalizedObject>;
};

export type CmsImage = {
  __typename?: 'CmsImage';
  photographerCredit?: Maybe<LocalizedObject>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type CollectionDetails = {
  __typename?: 'CollectionDetails';
  boxColor?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['Int']>;
  curatedEvents: Array<Scalars['String']>;
  curatedEventsTitle?: Maybe<LocalizedObject>;
  depth?: Maybe<Scalars['Int']>;
  description?: Maybe<LocalizedObject>;
  draftTitle?: Maybe<Scalars['String']>;
  eventListQuery?: Maybe<LocalizedObject>;
  eventListTitle?: Maybe<LocalizedObject>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  heroImage?: Maybe<CmsImage>;
  id: Scalars['ID'];
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  linkText?: Maybe<LocalizedObject>;
  linkUrl?: Maybe<LocalizedObject>;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
  socialMediaDescription?: Maybe<LocalizedObject>;
  title: LocalizedObject;
  urlPath?: Maybe<Scalars['String']>;
};

export type CollectionListResponse = {
  __typename?: 'CollectionListResponse';
  data: Array<CollectionDetails>;
};

export type Division = {
  __typename?: 'Division';
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
  ocdId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type EventDetails = {
  __typename?: 'EventDetails';
  audience: Array<Audience>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['String']>;
  description?: Maybe<LocalizedObject>;
  endTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  enrolmentStartTime?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  id: Scalars['ID'];
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  keywords: Array<Keyword>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  location?: Maybe<Place>;
  locationExtraInfo?: Maybe<LocalizedObject>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  name: LocalizedObject;
  offers: Array<Offer>;
  provider?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
  shortDescription?: Maybe<LocalizedObject>;
  startTime?: Maybe<Scalars['String']>;
  subEvents: Array<InternalIdObject>;
  superEvent?: Maybe<InternalIdObject>;
  superEventType?: Maybe<Scalars['String']>;
  typeId?: Maybe<EventTypeId>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  data: Array<EventDetails>;
  meta: Meta;
};

export enum EventTypeId {
  Course = 'Course',
  General = 'General'
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  language?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  createdTime?: Maybe<Scalars['String']>;
  cropping?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  internalContext?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalType?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  photographerName?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type InLanguage = {
  __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']>;
  internalContext?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
};

export type InternalIdObject = {
  __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  aggregate?: Maybe<Scalars['Boolean']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  internalContext?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalType?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  nEvents?: Maybe<Scalars['Int']>;
  name?: Maybe<LocalizedObject>;
  publisher?: Maybe<Scalars['ID']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  data: Array<Keyword>;
  meta: Meta;
};

export type LandingPage = {
  __typename?: 'LandingPage';
  bottomBanner?: Maybe<BannerPage>;
  contentType?: Maybe<Scalars['Int']>;
  depth?: Maybe<Scalars['Int']>;
  draftTitle?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['Int']>;
  metaInformation?: Maybe<LocalizedObject>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  pageTitle?: Maybe<LocalizedObject>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<LocalizedObject>;
  topBanner?: Maybe<BannerPage>;
  urlPath?: Maybe<Scalars['String']>;
};

export type LandingPagesResponse = {
  __typename?: 'LandingPagesResponse';
  data: Array<LandingPage>;
};

export type LocalizedCmsImage = {
  __typename?: 'LocalizedCmsImage';
  en?: Maybe<CmsImage>;
  fi?: Maybe<CmsImage>;
  sv?: Maybe<CmsImage>;
};

export type LocalizedCmsKeywords = {
  __typename?: 'LocalizedCmsKeywords';
  en?: Maybe<Array<Maybe<Scalars['String']>>>;
  fi?: Maybe<Array<Maybe<Scalars['String']>>>;
  sv?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LocalizedObject = {
  __typename?: 'LocalizedObject';
  en?: Maybe<Scalars['String']>;
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
};

export type Meta = {
  __typename?: 'Meta';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID'];
  name: LocalizedObject;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  data: Array<Neighborhood>;
  meta: Meta;
};

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  isFree?: Maybe<Scalars['Boolean']>;
  price?: Maybe<LocalizedObject>;
};

export type OrganizationDetails = {
  __typename?: 'OrganizationDetails';
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  classification?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  dissolutionDate?: Maybe<Scalars['String']>;
  foundingDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  internalContext?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalType?: Maybe<Scalars['String']>;
  isAffiliated: Scalars['Boolean'];
  lastModifiedTime?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentOrganization?: Maybe<Scalars['String']>;
  replacedBy?: Maybe<Scalars['String']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Place = {
  __typename?: 'Place';
  addressCountry?: Maybe<Scalars['String']>;
  addressLocality?: Maybe<LocalizedObject>;
  addressRegion?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Division>>;
  email?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Image>;
  infoUrl?: Maybe<LocalizedObject>;
  internalContext?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalType?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  nEvents?: Maybe<Scalars['Int']>;
  name?: Maybe<LocalizedObject>;
  parent?: Maybe<Scalars['ID']>;
  position?: Maybe<PlacePosition>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<LocalizedObject>;
  telephone?: Maybe<LocalizedObject>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  data: Array<Place>;
  meta: Meta;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  coordinates: Array<Scalars['Float']>;
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  aboutPages: AboutPagesResponse;
  accessibilityPages: AccessibilityPagesResponse;
  collectionDetails: CollectionDetails;
  collectionList: CollectionListResponse;
  eventDetails: EventDetails;
  eventList: EventListResponse;
  eventsByIds: EventListResponse;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  landingPage: LandingPage;
  landingPages: LandingPagesResponse;
  neighborhoodList: NeighborhoodListResponse;
  organizationDetails: OrganizationDetails;
  placeDetails: Place;
  placeList: PlaceListResponse;
};


export type QueryCollectionDetailsArgs = {
  draft?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['ID']>;
};


export type QueryCollectionListArgs = {
  visibleOnFrontpage?: InputMaybe<Scalars['Boolean']>;
};


export type QueryEventDetailsArgs = {
  id?: InputMaybe<Scalars['ID']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventListArgs = {
  allOngoing?: InputMaybe<Scalars['Boolean']>;
  allOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  allOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  audienceMaxAgeGt?: InputMaybe<Scalars['String']>;
  audienceMaxAgeLt?: InputMaybe<Scalars['String']>;
  audienceMinAgeGt?: InputMaybe<Scalars['String']>;
  audienceMinAgeLt?: InputMaybe<Scalars['String']>;
  combinedText?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  division?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  end?: InputMaybe<Scalars['String']>;
  endsAfter?: InputMaybe<Scalars['String']>;
  endsBefore?: InputMaybe<Scalars['String']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  inLanguage?: InputMaybe<Scalars['String']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetBased?: InputMaybe<Scalars['Boolean']>;
  internetOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isFree?: InputMaybe<Scalars['Boolean']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywordOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywordOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywordOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  language?: InputMaybe<Scalars['String']>;
  localOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  localOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  localOngoingOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  localOngoingOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  localOngoingOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  location?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  publisher?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  startsAfter?: InputMaybe<Scalars['String']>;
  startsBefore?: InputMaybe<Scalars['String']>;
  suitableFor?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  superEvent?: InputMaybe<Scalars['ID']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text?: InputMaybe<Scalars['String']>;
  translation?: InputMaybe<Scalars['String']>;
};


export type QueryEventsByIdsArgs = {
  end?: InputMaybe<Scalars['String']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>>>;
  ids: Array<Scalars['ID']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordListArgs = {
  dataSource?: InputMaybe<Scalars['String']>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type QueryLandingPageArgs = {
  draft?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type QueryLandingPagesArgs = {
  visibleOnFrontpage?: InputMaybe<Scalars['Boolean']>;
};


export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaceListArgs = {
  dataSource?: InputMaybe<Scalars['String']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type StaticPage = {
  __typename?: 'StaticPage';
  contentSection?: Maybe<LocalizedObject>;
  contentYype?: Maybe<Scalars['Int']>;
  depth?: Maybe<Scalars['Int']>;
  draftTitle?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  headingSection?: Maybe<LocalizedObject>;
  id: Scalars['ID'];
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['String']>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  urlPath?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type LocalizedFieldsFragment = { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null };

export type OfferFieldsFragment = { __typename?: 'Offer', isFree?: boolean | null, price?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null };

export type EventFieldsFragment = { __typename?: 'EventDetails', audienceMinAge?: string | null, audienceMaxAge?: string | null, id: string, eventStatus?: string | null, typeId?: EventTypeId | null, endTime?: string | null, startTime?: string | null, publisher?: string | null, externalLinks: Array<{ __typename?: 'ExternalLink', name?: string | null, link?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, name: string, url: string, photographerName?: string | null }>, subEvents: Array<{ __typename?: 'InternalIdObject', internalId?: string | null }>, superEvent?: { __typename?: 'InternalIdObject', internalId?: string | null } | null, inLanguage: Array<{ __typename?: 'InLanguage', name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, price?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null }, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, shortDescription?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, provider?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, audience: Array<{ __typename?: 'Audience', id?: string | null, name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> };

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type EventDetailsQuery = { __typename?: 'Query', eventDetails: { __typename?: 'EventDetails', audienceMinAge?: string | null, audienceMaxAge?: string | null, id: string, eventStatus?: string | null, typeId?: EventTypeId | null, endTime?: string | null, startTime?: string | null, publisher?: string | null, externalLinks: Array<{ __typename?: 'ExternalLink', name?: string | null, link?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, name: string, url: string, photographerName?: string | null }>, subEvents: Array<{ __typename?: 'InternalIdObject', internalId?: string | null }>, superEvent?: { __typename?: 'InternalIdObject', internalId?: string | null } | null, inLanguage: Array<{ __typename?: 'InLanguage', name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, price?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null }, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, shortDescription?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, provider?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, audience: Array<{ __typename?: 'Audience', id?: string | null, name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> } };

export type KeywordFieldsFragment = { __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null };

export type KeywordDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type KeywordDetailsQuery = { __typename?: 'Query', keywordDetails: { __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } };

export type KeywordListQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type KeywordListQuery = { __typename?: 'Query', keywordList: { __typename?: 'KeywordListResponse', meta: { __typename?: 'Meta', count: number, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> } };

export type NeighborhoodListQueryVariables = Exact<{ [key: string]: never; }>;


export type NeighborhoodListQuery = { __typename?: 'Query', neighborhoodList: { __typename?: 'NeighborhoodListResponse', meta: { __typename?: 'Meta', count: number, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Neighborhood', id: string, name: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } }> } };

export type OrganizationFieldsFragment = { __typename?: 'OrganizationDetails', id?: string | null, name?: string | null };

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OrganizationDetailsQuery = { __typename?: 'Query', organizationDetails: { __typename?: 'OrganizationDetails', id?: string | null, name?: string | null } };

export type PlaceFieldsFragment = { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null };

export type PlaceDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceDetailsQuery = { __typename?: 'Query', placeDetails: { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } };

export type PlaceListQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  hasUpcomingEvents?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type PlaceListQuery = { __typename?: 'Query', placeList: { __typename?: 'PlaceListResponse', meta: { __typename?: 'Meta', count: number, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> } };

export type EventListQueryVariables = Exact<{
  audienceMaxAgeGt?: InputMaybe<Scalars['String']>;
  audienceMinAgeLt?: InputMaybe<Scalars['String']>;
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>> | InputMaybe<EventTypeId>>;
  internetBased?: InputMaybe<Scalars['Boolean']>;
  suitableFor?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  allOngoing?: InputMaybe<Scalars['Boolean']>;
  allOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  division?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  end?: InputMaybe<Scalars['String']>;
  endsAfter?: InputMaybe<Scalars['String']>;
  endsBefore?: InputMaybe<Scalars['String']>;
  inLanguage?: InputMaybe<Scalars['String']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  isFree?: InputMaybe<Scalars['Boolean']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  keywordOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  keywordOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  keywordOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  language?: InputMaybe<Scalars['String']>;
  localOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  location?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  publisher?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
  startsAfter?: InputMaybe<Scalars['String']>;
  startsBefore?: InputMaybe<Scalars['String']>;
  superEvent?: InputMaybe<Scalars['ID']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  text?: InputMaybe<Scalars['String']>;
  translation?: InputMaybe<Scalars['String']>;
}>;


export type EventListQuery = { __typename?: 'Query', eventList: { __typename?: 'EventListResponse', meta: { __typename?: 'Meta', count: number, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'EventDetails', audienceMinAge?: string | null, audienceMaxAge?: string | null, id: string, eventStatus?: string | null, typeId?: EventTypeId | null, endTime?: string | null, startTime?: string | null, publisher?: string | null, externalLinks: Array<{ __typename?: 'ExternalLink', name?: string | null, link?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, name: string, url: string, photographerName?: string | null }>, subEvents: Array<{ __typename?: 'InternalIdObject', internalId?: string | null }>, superEvent?: { __typename?: 'InternalIdObject', internalId?: string | null } | null, inLanguage: Array<{ __typename?: 'InLanguage', name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, price?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null }, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, shortDescription?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, provider?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, audience: Array<{ __typename?: 'Audience', id?: string | null, name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> }> } };

export type EventsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
  eventType?: InputMaybe<Array<InputMaybe<EventTypeId>> | InputMaybe<EventTypeId>>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  sort?: InputMaybe<Scalars['String']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['String']>;
}>;


export type EventsByIdsQuery = { __typename?: 'Query', eventsByIds: { __typename?: 'EventListResponse', data: Array<{ __typename?: 'EventDetails', audienceMinAge?: string | null, audienceMaxAge?: string | null, id: string, eventStatus?: string | null, typeId?: EventTypeId | null, endTime?: string | null, startTime?: string | null, publisher?: string | null, externalLinks: Array<{ __typename?: 'ExternalLink', name?: string | null, link?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, name: string, url: string, photographerName?: string | null }>, subEvents: Array<{ __typename?: 'InternalIdObject', internalId?: string | null }>, superEvent?: { __typename?: 'InternalIdObject', internalId?: string | null } | null, inLanguage: Array<{ __typename?: 'InLanguage', name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, dataSource?: string | null, hasUpcomingEvents?: boolean | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, hasUpcomingEvents?: boolean | null, internalId: string, email?: string | null, postalCode?: string | null, divisions?: Array<{ __typename?: 'Division', type: string, name?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> | null, infoUrl?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, name?: { __typename?: 'LocalizedObject', fi?: string | null, en?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, streetAddress?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null, position?: { __typename?: 'PlacePosition', coordinates: Array<number> } | null, telephone?: { __typename?: 'LocalizedObject', fi?: string | null, sv?: string | null, en?: string | null } | null } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, price?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null }, description?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, shortDescription?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, provider?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, audience: Array<{ __typename?: 'Audience', id?: string | null, name?: { __typename?: 'LocalizedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> }>, meta: { __typename?: 'Meta', count: number, next?: string | null, previous?: string | null } } };

export const LocalizedFieldsFragmentDoc = gql`
    fragment localizedFields on LocalizedObject {
  en
  fi
  sv
}
    `;
export const KeywordFieldsFragmentDoc = gql`
    fragment keywordFields on Keyword {
  id
  internalId
  dataSource
  hasUpcomingEvents
  name {
    fi
    sv
    en
  }
}
    `;
export const PlaceFieldsFragmentDoc = gql`
    fragment placeFields on Place {
  id
  divisions {
    type
    name {
      fi
      sv
      en
    }
  }
  hasUpcomingEvents
  internalId
  email
  infoUrl {
    fi
    sv
    en
  }
  name {
    fi
    en
    sv
  }
  addressLocality {
    fi
    sv
    en
  }
  streetAddress {
    fi
    sv
    en
  }
  postalCode
  position {
    coordinates
  }
  telephone {
    fi
    sv
    en
  }
}
    `;
export const OfferFieldsFragmentDoc = gql`
    fragment offerFields on Offer {
  isFree
  price {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  infoUrl {
    ...localizedFields
  }
}
    ${LocalizedFieldsFragmentDoc}`;
export const EventFieldsFragmentDoc = gql`
    fragment eventFields on EventDetails {
  audienceMinAge
  audienceMaxAge
  id
  eventStatus
  externalLinks {
    name
    link
  }
  images {
    id
    name
    url
    photographerName
  }
  subEvents {
    internalId
  }
  typeId
  superEvent {
    internalId
  }
  inLanguage {
    name {
      ...localizedFields
    }
  }
  keywords {
    ...keywordFields
  }
  location {
    ...placeFields
  }
  offers {
    ...offerFields
  }
  name {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  shortDescription {
    ...localizedFields
  }
  endTime
  startTime
  publisher
  provider {
    ...localizedFields
  }
  infoUrl {
    ...localizedFields
  }
  audience {
    id
    name {
      ...localizedFields
    }
  }
}
    ${LocalizedFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${PlaceFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
export const OrganizationFieldsFragmentDoc = gql`
    fragment organizationFields on OrganizationDetails {
  id
  name
}
    `;
export const EventDetailsDocument = gql`
    query EventDetails($id: ID!, $include: [String]) {
  eventDetails(id: $id, include: $include) {
    ...eventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useEventDetailsQuery(baseOptions: Apollo.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
      }
export function useEventDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsQueryResult = Apollo.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const KeywordDetailsDocument = gql`
    query KeywordDetails($id: ID!) {
  keywordDetails(id: $id) {
    ...keywordFields
  }
}
    ${KeywordFieldsFragmentDoc}`;

/**
 * __useKeywordDetailsQuery__
 *
 * To run a query within a React component, call `useKeywordDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordDetailsQuery(baseOptions: Apollo.QueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, options);
      }
export function useKeywordDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, options);
        }
export type KeywordDetailsQueryHookResult = ReturnType<typeof useKeywordDetailsQuery>;
export type KeywordDetailsLazyQueryHookResult = ReturnType<typeof useKeywordDetailsLazyQuery>;
export type KeywordDetailsQueryResult = Apollo.QueryResult<KeywordDetailsQuery, KeywordDetailsQueryVariables>;
export const KeywordListDocument = gql`
    query KeywordList($dataSource: String, $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywordList(
    dataSource: $dataSource
    hasUpcomingEvents: $hasUpcomingEvents
    page: $page
    pageSize: $pageSize
    showAllKeywords: $showAllKeywords
    sort: $sort
    text: $text
  ) {
    meta {
      count
      next
      previous
    }
    data {
      ...keywordFields
    }
  }
}
    ${KeywordFieldsFragmentDoc}`;

/**
 * __useKeywordListQuery__
 *
 * To run a query within a React component, call `useKeywordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useKeywordListQuery(baseOptions?: Apollo.QueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, options);
      }
export function useKeywordListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, options);
        }
export type KeywordListQueryHookResult = ReturnType<typeof useKeywordListQuery>;
export type KeywordListLazyQueryHookResult = ReturnType<typeof useKeywordListLazyQuery>;
export type KeywordListQueryResult = Apollo.QueryResult<KeywordListQuery, KeywordListQueryVariables>;
export const NeighborhoodListDocument = gql`
    query NeighborhoodList {
  neighborhoodList {
    meta {
      count
      next
      previous
    }
    data {
      id
      name {
        fi
        sv
        en
      }
    }
  }
}
    `;

/**
 * __useNeighborhoodListQuery__
 *
 * To run a query within a React component, call `useNeighborhoodListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNeighborhoodListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNeighborhoodListQuery({
 *   variables: {
 *   },
 * });
 */
export function useNeighborhoodListQuery(baseOptions?: Apollo.QueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, options);
      }
export function useNeighborhoodListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, options);
        }
export type NeighborhoodListQueryHookResult = ReturnType<typeof useNeighborhoodListQuery>;
export type NeighborhoodListLazyQueryHookResult = ReturnType<typeof useNeighborhoodListLazyQuery>;
export type NeighborhoodListQueryResult = Apollo.QueryResult<NeighborhoodListQuery, NeighborhoodListQueryVariables>;
export const OrganizationDetailsDocument = gql`
    query OrganizationDetails($id: ID!) {
  organizationDetails(id: $id) {
    ...organizationFields
  }
}
    ${OrganizationFieldsFragmentDoc}`;

/**
 * __useOrganizationDetailsQuery__
 *
 * To run a query within a React component, call `useOrganizationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationDetailsQuery(baseOptions: Apollo.QueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, options);
      }
export function useOrganizationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, options);
        }
export type OrganizationDetailsQueryHookResult = ReturnType<typeof useOrganizationDetailsQuery>;
export type OrganizationDetailsLazyQueryHookResult = ReturnType<typeof useOrganizationDetailsLazyQuery>;
export type OrganizationDetailsQueryResult = Apollo.QueryResult<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($id: ID!) {
  placeDetails(id: $id) {
    ...placeFields
  }
}
    ${PlaceFieldsFragmentDoc}`;

/**
 * __usePlaceDetailsQuery__
 *
 * To run a query within a React component, call `usePlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaceDetailsQuery(baseOptions: Apollo.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, options);
      }
export function usePlaceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, options);
        }
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<typeof usePlaceDetailsLazyQuery>;
export type PlaceDetailsQueryResult = Apollo.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
export const PlaceListDocument = gql`
    query PlaceList($dataSource: String, $divisions: [String], $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  placeList(
    dataSource: $dataSource
    divisions: $divisions
    hasUpcomingEvents: $hasUpcomingEvents
    page: $page
    pageSize: $pageSize
    showAllPlaces: $showAllPlaces
    sort: $sort
    text: $text
  ) {
    meta {
      count
      next
      previous
    }
    data {
      ...placeFields
    }
  }
}
    ${PlaceFieldsFragmentDoc}`;

/**
 * __usePlaceListQuery__
 *
 * To run a query within a React component, call `usePlaceListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      divisions: // value for 'divisions'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePlaceListQuery(baseOptions?: Apollo.QueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, options);
      }
export function usePlaceListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, options);
        }
export type PlaceListQueryHookResult = ReturnType<typeof usePlaceListQuery>;
export type PlaceListLazyQueryHookResult = ReturnType<typeof usePlaceListLazyQuery>;
export type PlaceListQueryResult = Apollo.QueryResult<PlaceListQuery, PlaceListQueryVariables>;
export const EventListDocument = gql`
    query EventList($audienceMaxAgeGt: String, $audienceMinAgeLt: String, $eventType: [EventTypeId], $internetBased: Boolean, $suitableFor: [Int], $allOngoing: Boolean, $allOngoingAnd: [String], $division: [String], $end: String, $endsAfter: String, $endsBefore: String, $inLanguage: String, $include: [String], $isFree: Boolean, $keyword: [String], $keywordAnd: [String], $keywordOrSet1: [String], $keywordOrSet2: [String], $keywordOrSet3: [String], $keywordNot: [String], $language: String, $localOngoingAnd: [String], $location: [String], $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $startsAfter: String, $startsBefore: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String) {
  eventList(
    audienceMaxAgeGt: $audienceMaxAgeGt
    audienceMinAgeLt: $audienceMinAgeLt
    eventType: $eventType
    internetBased: $internetBased
    suitableFor: $suitableFor
    allOngoing: $allOngoing
    allOngoingAnd: $allOngoingAnd
    division: $division
    end: $end
    endsAfter: $endsAfter
    endsBefore: $endsBefore
    include: $include
    inLanguage: $inLanguage
    isFree: $isFree
    keyword: $keyword
    keywordAnd: $keywordAnd
    keywordOrSet1: $keywordOrSet1
    keywordOrSet2: $keywordOrSet2
    keywordOrSet3: $keywordOrSet3
    keywordNot: $keywordNot
    language: $language
    localOngoingAnd: $localOngoingAnd
    location: $location
    page: $page
    pageSize: $pageSize
    publisher: $publisher
    sort: $sort
    start: $start
    startsAfter: $startsAfter
    startsBefore: $startsBefore
    superEvent: $superEvent
    superEventType: $superEventType
    text: $text
    translation: $translation
  ) {
    meta {
      count
      next
      previous
    }
    data {
      ...eventFields
    }
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useEventListQuery__
 *
 * To run a query within a React component, call `useEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQuery({
 *   variables: {
 *      audienceMaxAgeGt: // value for 'audienceMaxAgeGt'
 *      audienceMinAgeLt: // value for 'audienceMinAgeLt'
 *      eventType: // value for 'eventType'
 *      internetBased: // value for 'internetBased'
 *      suitableFor: // value for 'suitableFor'
 *      allOngoing: // value for 'allOngoing'
 *      allOngoingAnd: // value for 'allOngoingAnd'
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      endsAfter: // value for 'endsAfter'
 *      endsBefore: // value for 'endsBefore'
 *      inLanguage: // value for 'inLanguage'
 *      include: // value for 'include'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordOrSet1: // value for 'keywordOrSet1'
 *      keywordOrSet2: // value for 'keywordOrSet2'
 *      keywordOrSet3: // value for 'keywordOrSet3'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      localOngoingAnd: // value for 'localOngoingAnd'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      startsAfter: // value for 'startsAfter'
 *      startsBefore: // value for 'startsBefore'
 *      superEvent: // value for 'superEvent'
 *      superEventType: // value for 'superEventType'
 *      text: // value for 'text'
 *      translation: // value for 'translation'
 *   },
 * });
 */
export function useEventListQuery(baseOptions?: Apollo.QueryHookOptions<EventListQuery, EventListQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
      }
export function useEventListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventListQuery, EventListQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
        }
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<typeof useEventListLazyQuery>;
export type EventListQueryResult = Apollo.QueryResult<EventListQuery, EventListQueryVariables>;
export const EventsByIdsDocument = gql`
    query EventsByIds($ids: [ID!]!, $eventType: [EventTypeId], $include: [String], $sort: String, $pageSize: Int, $page: Int, $start: String, $end: String) {
  eventsByIds(
    ids: $ids
    eventType: $eventType
    include: $include
    sort: $sort
    pageSize: $pageSize
    page: $page
    start: $start
    end: $end
  ) {
    data {
      ...eventFields
    }
    meta {
      count
      next
      previous
    }
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useEventsByIdsQuery__
 *
 * To run a query within a React component, call `useEventsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      eventType: // value for 'eventType'
 *      include: // value for 'include'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEventsByIdsQuery(baseOptions: Apollo.QueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
        const options = { ...defaultOptions, ...baseOptions }
        return Apollo.useQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, options);
      }
export function useEventsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
          const options = { ...defaultOptions, ...baseOptions }
          return Apollo.useLazyQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, options);
        }
export type EventsByIdsQueryHookResult = ReturnType<typeof useEventsByIdsQuery>;
export type EventsByIdsLazyQueryHookResult = ReturnType<typeof useEventsByIdsLazyQuery>;
export type EventsByIdsQueryResult = Apollo.QueryResult<EventsByIdsQuery, EventsByIdsQueryVariables>;