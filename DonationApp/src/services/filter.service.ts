import { CountryType, ICountryFilter, IRangeFilter, Project } from '../types';


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
      if (idx % 4 == 0 || costsList.length === idx + 1) {
        const last = lastSelectedRange;
        lastSelectedRange = item;
        return {
          value: ``,
          from: last,
          to: lastSelectedRange,
          id: idx,
        };
      }
    });
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
      .filter(item => item.value !== undefined);
    return countries;
  }

  public static applyCountryFilter(projects: Project[], country: ICountryFilter): Project[] {
    return projects.filter(item => (item.country === country.value || country.id === CountryType.AllCountries));
  }
}