/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
* */
import { ActionCreator } from 'redux';
import { AppActions, Languages } from '../../types';
import { appActionsConstants } from '../../constants';

export const showUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: appActionsConstants.SHOW_APP_LOADER,
    payload: true,
  };
};

export const hideUiLoaderAction: ActionCreator<AppActions> = (): AppActions => {
  return {
    type: appActionsConstants.HIDE_APP_LOADER,
    payload: false,
  };
};

export const changeCurrentLanguageAction: ActionCreator<AppActions> = (language: Languages): AppActions => {
  return {
    type: appActionsConstants.CHANGE_CURRENT_LANGUAGE,
    payload: language,
  };
};