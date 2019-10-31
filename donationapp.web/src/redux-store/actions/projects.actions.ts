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
import { AppActionsConstants, ProjectsActionsConstants } from '../../constants';
import { ProjectsService } from '../../services';

type ProjectsThunkAction = ThunkAction<Promise<any>, ProjectsState, null, ProjectsActions>;

export const getDonationProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?: number): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await ProjectsService.getDonationProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: ProjectsActionsConstants.GetDonationProjects,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: AppActionsConstants.HideAppLoader,
      });
      throw new Error(e.message);
    }
  };
};

export const getExecutionProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await ProjectsService.getExecutionProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: ProjectsActionsConstants.GetExecutionProjects,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: AppActionsConstants.HideAppLoader,
      });
      throw new Error(e.message);
    }
  };
};

export const getCompletedProjectsAction: ActionCreator<ProjectsThunkAction> = (localLang: Languages, categoryId?: number, pageNumber?): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results: ProjectsWithPagination = await ProjectsService.getFinishedProjects(localLang, categoryId, pageNumber);
      dispatch({
        type: ProjectsActionsConstants.GetCompletedProjects,
        payload: {
          ...results,
          withPages: !!pageNumber,
        },
      });
    } catch (e) {
      dispatch({
        type: AppActionsConstants.HideAppLoader,
      });
      throw new Error(e.message);
    }
  };
};


export const getProjectCategoriesAction: ActionCreator<ProjectsThunkAction> = (localLang: string): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      const results = await ProjectsService.getProjectCategories(localLang);
      dispatch({
        type: ProjectsActionsConstants.GetProjectCategories,
        payload: results,
      });
    } catch (e) {
      dispatch({
        type: AppActionsConstants.HideAppLoader,
      });
      throw new Error(e.message);
    }
  };
};

export const changeActiveCategoryAction: ActionCreator<ProjectsThunkAction> = (activeCategory: Category): ProjectsThunkAction => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ProjectsActionsConstants.ChangeActiveCategory,
        payload: activeCategory,
      });
    } catch (e) {
      dispatch({
        type: AppActionsConstants.HideAppLoader,
      });
      throw new Error(e.message);
    }
  };
};