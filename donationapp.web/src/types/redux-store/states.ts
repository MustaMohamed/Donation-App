import { Category, Language } from '../common';
import { ProjectsWithPagination } from '../models';

export interface AppState {
  uiLoaderIsActive?: boolean;
  language: Language
}

export interface ProjectsState {
  donationProjects: ProjectsWithPagination;
  executionProjects: ProjectsWithPagination;
  completedProjects: ProjectsWithPagination;
  categories: {
    categoriesList: Category[];
    activeCategory: Category;
  }
}