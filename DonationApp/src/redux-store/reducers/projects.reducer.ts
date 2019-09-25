import { ProjectsActions, ProjectsState } from '../../types/redux-store';
import { Reducer } from 'redux';
import { projectsActionsConstants } from '../../constants/redux-store/actions';


const initialState: ProjectsState = {
  donationProjects: [],
  doneProjects: [],
  executionProjects: [],
};

export const projectsReducer: Reducer<ProjectsState, ProjectsActions> = (state: ProjectsState = initialState, action: ProjectsActions) => {
  switch (action.type) {
    case projectsActionsConstants.GET_DONATION_PROJECTS:
      return {
        ...state,
        donationProjects: action.payload,
      };
    case projectsActionsConstants.GET_EXECUTION_PROJECTS:
      return {
        ...state,
        executionProjects: action.payload,
      };
    case projectsActionsConstants.GET_DONE_PROJECTS:
      return {
        ...state,
        doneProjects: action.payload,
      };
    default:
      return { ...state };
  }
};