import { CountryType, FiltersMenuConstructFactor, ICountryFilter, IRangeFilter, Project, ProjectFilterStatusType } from '../types';
import ValidationService from './validation.service';

export default class ProjectsFilterService {

  public static constructRangesFilter(projects: Project[]): IRangeFilter[] {
    const sortedItem: number[] = projects
      .sort((first, second) =>
        (first.cost > second.cost ? 1 : (first.cost < second.cost ? -1 : 0)))
      .map(item => item.cost);
    const distinct = new Set<number>(sortedItem);
    const costsList = Array.from(distinct);
    let lastSelectedRange = 0;
    const filterRanges: IRangeFilter[] = costsList.map((item, idx) => {
      if (idx % FiltersMenuConstructFactor.Ranges == 0 || costsList.length === idx + 1) {
        const last = lastSelectedRange;
        lastSelectedRange = item;
        if (costsList.length >= FiltersMenuConstructFactor.Ranges) {
          return {
            value: ``,
            from: last,
            to: lastSelectedRange,
            id: idx,
          };
        }
      }
    }).filter(item => !ValidationService.isEmpty(item));
    filterRanges.unshift({
      value: ``,
      from: 0,
      to: lastSelectedRange,
      id: -1,
    });
    return filterRanges;
  }

  public static applyRangeFilter(projects: Project[], filterConstraints: IRangeFilter): Project[] {
    return projects.filter(item => (item.cost <= filterConstraints.to && item.cost >= filterConstraints.from));
  }

  public static constructCountriesFilter(projects: Project[]): ICountryFilter[] {
    let countriesList: string[] = projects
      .map(item => (item.country));
    let countries = Array
      .from(new Set<string>(countriesList))
      .map((item, idx) => ({ value: item, id: idx }))
      .filter(item => !ValidationService.isEmpty(item));
    return countries;
  }

  public static applyCountryFilter(projects: Project[], country: ICountryFilter): Project[] {
    return projects.filter(item => (item.country === country.value || country.id === CountryType.AllCountries));
  }

  public static applyProjectsStatusFilter(projects: Project[], statusType: ProjectFilterStatusType): Project[] {
    return projects.filter(item => {
      if (statusType === ProjectFilterStatusType.Donation) {
        return !item.isCostCollectedDone;
      }
      if (statusType === ProjectFilterStatusType.Execution) {
        return item.isCostCollectedDone;
      }
      if (statusType === ProjectFilterStatusType.Finished) {
        return item.isCostCollectedDone && item.isExecutionDone;
      }
    });

  }
}