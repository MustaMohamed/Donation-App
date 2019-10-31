import { Action } from 'redux';
import { ProjectsActionsConstants } from '../../../constants';
import { ProjectsWithPagination } from '../../models';
import { Category } from '../../common';

interface ProjectsActionsPayload extends ProjectsWithPagination {
  withPages: boolean;
}

export interface GetDonationProjectsAction extends Action {
  type: typeof ProjectsActionsConstants.GetDonationProjects;
  payload: ProjectsActionsPayload;
}

export interface GetExecutionProjectsAction extends Action {
  type: typeof ProjectsActionsConstants.GetExecutionProjects;
  payload: ProjectsActionsPayload;
}


export interface GetFinishedProjectsAction extends Action {
  type: typeof ProjectsActionsConstants.GetCompletedProjects;
  payload: ProjectsActionsPayload;
}

export interface GetProjectCategoriesAction extends Action {
  type: typeof ProjectsActionsConstants.GetProjectCategories,
  payload: Category[]
}

export interface ChangeActiveCategoryAction {
  type: typeof ProjectsActionsConstants.ChangeActiveCategory,
  payload: Category;
}

export type ProjectsActions = GetDonationProjectsAction | GetExecutionProjectsAction | GetFinishedProjectsAction | GetProjectCategoriesAction | ChangeActiveCategoryAction;