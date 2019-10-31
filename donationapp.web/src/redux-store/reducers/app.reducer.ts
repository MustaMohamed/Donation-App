import { Reducer } from 'redux';
import { AppActionsConstants } from '../../constants';
import { AppActions, AppState, Languages } from '../../types';

const initialState: AppState = {
  uiLoaderIsActive: false,
  language: {
    currentLanguage: Languages.En,
    prevLanguage: Languages.En,
    isRTL: false,
  },
};

export const appReducer: Reducer<AppState, AppActions> = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case AppActionsConstants.ShowAppLoader:
      return {
        ...state,
        uiLoaderIsActive: action.payload as boolean,
      };
    case AppActionsConstants.HideAppLoader:
      return {
        ...state,
        uiLoaderIsActive: action.payload as boolean,
      };
    case AppActionsConstants.ChangeCurrentLanguage:
      return {
        ...state,
        language: {
          currentLanguage: action.payload as Languages,
          prevLanguage: state.language.currentLanguage,
          isRTL: (action.payload as Languages) === Languages.Ar,
        },
      };
    default:
      return state;
  }
};