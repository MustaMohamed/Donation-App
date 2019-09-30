/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
*
* // thunk action
*
* action_name: ActionCreator<ThunkAction<return_type, stateType, null, ActionsType>> = (): [action_return_type: ThunkAction<return_type, stateType, null, ActionsType>] => {}
*
* */

import { ActionCreator, Dispatch } from 'redux';
import { ProjectResponse, ProjectsActions, ProjectsState } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { projects } from '../../utils';
import { projectsActionsConstants } from '../../constants/redux-store/actions';
import { projectsService } from '../../services';

type ProjectsThunkAction = ThunkAction<Promise<any>, ProjectsState, null, ProjectsActions>;

export const getDonationProjectsAction: ActionCreator<ProjectsThunkAction> = (): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectResponse = await projectsService.getDonationProjects();
      dispatch({
        type: projectsActionsConstants.GET_DONATION_PROJECTS,
        payload: results.projects,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getExecutionProjectsAction: ActionCreator<ProjectsThunkAction> = (): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectResponse = await projectsService.getExecutionProjects();
      dispatch({
        type: projectsActionsConstants.GET_EXECUTION_PROJECTS,
        payload: results.projects,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDoneProjectsAction: ActionCreator<ProjectsThunkAction> = (): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectResponse = await projectsService.getDoneProjects();
      dispatch({
        type: projectsActionsConstants.GET_DONE_PROJECTS,
        payload: results.projects,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllProjectsAction: ActionCreator<ProjectsThunkAction> = (): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results = await projectsService.getAllProjects();
      console.log('from all => ', results);
      dispatch({
        type: projectsActionsConstants.GET_ALL_PROJECTS,
        payload: projects,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

