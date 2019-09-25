import { Languages } from '../common';
import { Project } from '../models';

export interface AppState {
  uiLoaderIsActive?: boolean;
  language: {
    currentLanguage: Languages;
    prevLanguage: Languages;
    isRTL: boolean;
  }
}

export interface ProjectsState {
  donationProjects: Project[];
  executionProjects: Project[];
  doneProjects: Project[];
}