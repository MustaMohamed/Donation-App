import { Languages } from '../common';

export interface AppState {
  uiLoaderIsActive?: boolean;
  language: {
    currentLanguage: Languages;
    prevLanguage: Languages;
    isRTL: boolean;
  }
}
