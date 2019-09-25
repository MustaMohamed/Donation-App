import { Action } from 'redux';
import { projectsActionsConstants } from '../../../constants';
import { Project } from '../../models';

export interface GetDonationProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_DONATION_PROJECTS;
  payload: Project[];
}

export interface GetExecutionProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_EXECUTION_PROJECTS;
  payload: Project[];
}


export interface GetDoneProjectsAction extends Action {
  type: typeof projectsActionsConstants.GET_DONE_PROJECTS;
  payload: Project[];
}

export type ProjectsActions = GetDonationProjectsAction | GetExecutionProjectsAction | GetDoneProjectsAction;