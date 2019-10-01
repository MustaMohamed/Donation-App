export enum Languages {
  En = 'en',
  Ar = 'ar',
}

export enum RelatedProjectsType {
  Category,
  Village
}

export enum ProjectFilterType {
  Donation,
  Execution,
  Finished
}

export interface Language {
  currentLanguage: Languages;
  prevLanguage: Languages;
  isRTL: boolean;
}