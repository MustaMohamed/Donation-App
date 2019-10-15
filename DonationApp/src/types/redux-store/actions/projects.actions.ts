import { Action } from 'redux';
import { projectsActionsConstants } from '../../../constants';
import { ProjectsWithPagination } from '../../models';
import { Category } from '../../common';

interface ProjectsActionsPayload extends ProjectsWithPagination {
  withPages: boolean;
}

export interface GetDonationProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_DONATION_PROJECTS;
  payload: ProjectsActionsPayload;
}

export interface GetExecutionProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_EXECUTION_PROJECTS;
  payload: ProjectsActionsPayload;
}


export interface GetDoneProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_DONE_PROJECTS;
  payload: ProjectsActionsPayload;
}

export interface GetProjectCategoriesAction extends Action {
  type: typeof projectsActionsConstants.GET_PROJECT_CATEGORIES,
  payload: Category[]
}

export interface ChangeActiveCategoryAction {
  type: typeof projectsActionsConstants.GET_PROJECT_CATEGORIES,
  payload: Category;
}

export type ProjectsActions = GetDonationProjectsAction | GetExecutionProjectsAction | GetDoneProjectsAction | GetProjectCategoriesAction | ChangeActiveCategoryAction;