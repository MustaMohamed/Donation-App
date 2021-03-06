import { ProjectsActions, ProjectsState } from '../../types/redux-store';
import { Reducer } from 'redux';
import { projectsActionsConstants } from '../../constants/redux-store/actions';
import { ProjectsWithPagination } from '../../types/models';
import { CategoryType } from '../../types';


const initialState: ProjectsState = {
  donationProjects: {
    projects: [],
    pagination: null,
  },
  executionProjects: {
    projects: [],
    pagination: null,
  },
  doneProjects: {
    projects: [],
    pagination: null,
  },
  categories: {
    activeCategory: {
      name: '',
      id: CategoryType.AllCategories,
    },
    categoriesList: [],
  },
};

export const projectsReducer: Reducer<ProjectsState, ProjectsActions> = (state: ProjectsState = initialState, action: ProjectsActions): ProjectsState => {
  switch (action.type) {
    case projectsActionsConstants.GET_DONATION_PROJECTS:
      const { donationProjects } = state;
      return {
        ...state,
        donationProjects: action.payload.withPages ? {
          projects: [...donationProjects.projects, ...action.payload.projects],
          pagination: { ...action.payload.pagination },
        } as ProjectsWithPagination : {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case projectsActionsConstants.GET_EXECUTION_PROJECTS:
      const { executionProjects } = state;
      return {
        ...state,
        executionProjects: action.payload.withPages ? {
          projects: [...executionProjects.projects, ...action.payload.projects],
          pagination: { ...action.payload.pagination },
        } as ProjectsWithPagination : {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case projectsActionsConstants.GET_DONE_PROJECTS:
      const { doneProjects } = state;
      return {
        ...state,
        doneProjects: action.payload.withPages ? {
          projects: [...doneProjects.projects, ...action.payload.projects],
          pagination: { ...action.payload.pagination },
        } as ProjectsWithPagination : {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case projectsActionsConstants.GET_PROJECT_CATEGORIES:
      const { categories } = state;
      return {
        ...state,
        categories: {
          ...categories,
          categoriesList: action.payload,
        },
      };
    case projectsActionsConstants.CHANGE_ACTIVE_CATEGORY:
      const { categories: category } = state;
      return {
        ...state,
        categories: {
          ...category,
          activeCategory: action.payload,
        },
      };
    default:
      return { ...state };
  }
};