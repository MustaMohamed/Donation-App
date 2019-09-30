import { Languages } from '../common';
import { ProjectsWithPagination } from '../models';

export interface AppState {
  uiLoaderIsActive?: boolean;
  language: {
    currentLanguage: Languages;
    prevLanguage: Languages;
    isRTL: boolean;
  }
}

export interface ProjectsState {
  donationProjects: ProjectsWithPagination;
  executionProjects: ProjectsWithPagination;
  doneProjects: ProjectsWithPagination;
}