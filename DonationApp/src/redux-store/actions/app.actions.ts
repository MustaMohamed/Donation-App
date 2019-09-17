/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
* */
import { Action, ActionCreator } from 'redux';

export const appGoAction: ActionCreator<Action> = (): Action => {
  return {
    type: 'go',
  };
};