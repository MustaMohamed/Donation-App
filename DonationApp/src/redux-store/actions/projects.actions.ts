/*
* action_name: ActionCreator<ActionsType> = (): [action_return_type: ActionsType] => {}
*
* // thunk action
*
* action_name: ActionCreator<ThunkAction<return_type, stateType, null, ActionsType>> = (): [action_return_type: ThunkAction<return_type, stateType, null, ActionsType>] => {}
*
* */

import { ActionCreator, Dispatch } from 'redux';
import { Category, Languages, ProjectsActions, ProjectsState, ProjectsWithPagination } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { projects } from '../../utils';
import { appActionsConstants, projectsActionsConstants } from '../../constants';
import { projectsService } from '../../services';

type ProjectsThunkAction = ThunkAction<Promise<any>, ProjectsState, null, ProjectsActions>;

export const getDonationProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?: number): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await projectsService.getDonationProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: projectsActionsConstants.GET_DONATION_PROJECTS,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};

export const getExecutionProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await projectsService.getExecutionProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: projectsActionsConstants.GET_EXECUTION_PROJECTS,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};

export const getDoneProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await projectsService.getDoneProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: projectsActionsConstants.GET_DONE_PROJECTS,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};

export const getAllProjectsAction: ActionCreator<ProjectsThunkAction> = (): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results = await projectsService.getAllProjects();
      dispatch({
        type: projectsActionsConstants.GET_ALL_PROJECTS,
        payload: projects,
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};

export const getProjectCategoriesAction: ActionCreator<ProjectsThunkAction> = (localLang: string): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results = await projectsService.getProjectCategories(localLang);
      dispatch({
        type: projectsActionsConstants.GET_PROJECT_CATEGORIES,
        payload: results,
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};

export const changeActiveCategoryAction: ActionCreator<ProjectsThunkAction> = (activeCategory: Category): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: projectsActionsConstants.CHANGE_ACTIVE_CATEGORY,
        payload: activeCategory,
      });
    } catch (e) {
      dispatch({
        type: appActionsConstants.HIDE_APP_LOADER,
      });
      throw new Error(e.message);
    }
  };
};