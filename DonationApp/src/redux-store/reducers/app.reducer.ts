import { Reducer } from 'redux';
import { appActionsConstants } from '../../constants';
import { AppActions, AppState, Languages } from '../../types';

const initialState: AppState = {
  uiLoaderIsActive: false,
  currentLanguage: Languages.En,
};

export const appReducer: Reducer<AppState, AppActions> = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case appActionsConstants.SHOW_APP_LOADER:
      return {
        ...state,
        uiLoaderIsActive: action.payload as boolean,
      };
    case appActionsConstants.HIDE_APP_LOADER:
      return {
        ...state,
        uiLoaderIsActive: action.payload as boolean,
      };
    case appActionsConstants.CHANGE_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload as Languages,
      };
    default:
      return state;
  }
};