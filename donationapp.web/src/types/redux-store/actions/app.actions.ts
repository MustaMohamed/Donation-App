import { Action } from 'redux';
import { AppActionsConstants } from '../../../constants';
import { Languages } from '../../common';


export interface ShowUiLoaderAction extends Action {
  type: typeof AppActionsConstants.ShowAppLoader;
  payload: boolean;
}

export interface HideUiLoaderAction extends Action {
  type: typeof AppActionsConstants.HideAppLoader;
  payload: boolean;
}

export interface ChangeCurrentLanguageAction extends Action {
  type: typeof AppActionsConstants.ChangeCurrentLanguage,
  payload: Languages
}

export type AppActions = ShowUiLoaderAction | HideUiLoaderAction | ChangeCurrentLanguageAction;