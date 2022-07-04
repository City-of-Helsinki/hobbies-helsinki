import { TFunction } from 'next-i18next';
import { ReactElement } from 'react';

import { AUTOSUGGEST_TYPES } from '../constants';

export interface AutosuggestMenuOption {
  text: string;
  type: AUTOSUGGEST_TYPES;
  value: string;
}

export interface Category {
  icon?: ReactElement;
  text: string;
  value: string;
}

/**
 * export / forward the translation functions so it would be easier to support multiple
 * different kind of translation functions between the different apps
 */
export type UnionTFunction = TFunction;
