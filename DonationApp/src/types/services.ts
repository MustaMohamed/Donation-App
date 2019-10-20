import { ICountryFilter, IRangeFilter } from './common';
import { Project } from './models';

export interface IRefreshableList {
  refreshList(): void;

  onRefreshList(): void;
}

export interface ICountriesFilterService {
  constructCountriesFilter(projects: Project[]): ICountryFilter[];

  applyCountryFilter(projects: Project[], country: ICountryFilter): Project[];
}

export interface IRangeFilterService {
  constructRangesFilter(projects: Project[]): IRangeFilter[];

  applyRangeFilter(projects: Project[], filterConstraints: IRangeFilter): Project[];
}
