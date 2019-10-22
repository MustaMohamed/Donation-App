export enum Languages {
  En = 'en',
  Ar = 'ar',
}

export enum RelatedProjectsType {
  Category,
  Village
}

export enum ProjectFilterStatusType {
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

export interface IRangeFilter {
  value: string;
  from: number;
  to: number;
  id: number;
};

export interface ICountryFilter {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  name: string;
}

export enum CategoryType {
  AllCategories = -1
}

export enum CountryType {
  AllCountries = -1
}

export enum FiltersMenuConstructFactor {
  Ranges = 4,
  Countries = 1
}