import { Reducer } from 'redux';
import { ProjectsActionsConstants } from '../../constants';
import { CategoryType, ProjectsActions, ProjectsState, ProjectsWithPagination } from '../../types';


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
    case ProjectsActionsConstants.GetDonationProjects:
      const { donationProjects } = state;
      return {
        ...state,
        donationProjects: action.payload.withPages ? {
          projects: [
            ...donationProjects.projects,
            ...action.payload.projects,
          ],
          pagination: { ...action.payload.pagination },
        } as ProjectsWithPagination : {
          projects: action.payload.projects,
          pagination: action.payload.pagination,
        },
      };
    case ProjectsActionsConstants.GetExecutionProjects:
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
    case ProjectsActionsConstants.GetCompletedProjects:
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