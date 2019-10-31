/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
* */
import { ActionCreator } from 'redux';
import { AppActions, Languages } from '../../types';
import { AppActionsConstants } from '../../constants';

export const showUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: AppActionsConstants.ShowAppLoader,
    payload: true,
  };
};

export const hideUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: AppActionsConstants.HideAppLoader,
    payload: false,
  };
};

export const changeCurrentLanguageAction: ActionCreator<AppActions> = (language: Languages): AppActions => {
  return {
    type: AppActionsConstants.ChangeCurrentLanguage,
    payload: language,
  };
};