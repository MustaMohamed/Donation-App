import { Action } from 'redux';
import { appActionsConstants } from '../../../constants';
import { Languages } from '../../common';


export interface ShowUiLoaderAction extends Action {
  type: typeof appActionsConstants.SHOW_APP_LOADER;
  payload: boolean;
}

export interface HideUiLoaderAction extends Action {
  type: typeof appActionsConstants.HIDE_APP_LOADER;
  payload: boolean;
}

export interface ChangeCurrentLanguageAction extends Action {
  type: typeof appActionsConstants.CHANGE_CURRENT_LANGUAGE,
  payload: Languages
}

export type AppActions = ShowUiLoaderAction | HideUiLoaderAction | ChangeCurrentLanguageAction;