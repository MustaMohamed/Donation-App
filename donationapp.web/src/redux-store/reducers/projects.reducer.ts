import { Reducer } from 'redux';
import { ProjectsActionsConstants } from '../../constants';
import { CategoryType, ProjectsActions, ProjectsState } from '../../types';

const initialState: ProjectsState = {
  donationProjects: {
    projects: [],
    pagination: null,
  },
  executionProjects: {
    projects: [],
    pagination: null,
  },
  completedProjects: {
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
    case ProjectsActionsConstants.GetDonationProjects:
      return {
        ...state,
        donationProjects: {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case ProjectsActionsConstants.GetExecutionProjects:
      return {
        ...state,
        executionProjects: {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case ProjectsActionsConstants.GetCompletedProjects:
      return {
        ...state,
        completedProjects: {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case ProjectsActionsConstants.GetProjectCategories:
      const { categories } = state;
      return {
        ...state,
        categories: {
          ...categories,
          categoriesList: action.payload,
        },
      };
    case ProjectsActionsConstants.ChangeActiveCategory:
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