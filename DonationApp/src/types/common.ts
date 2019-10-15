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

export enum PaymentMethod {
  Paypal,
  Fawry,
  CreditCard
}

export interface FilterRange {
  value: string;
  from: number;
  to: number;
  id: number;
};

export interface Category {
  id: number;
  name: string;
}