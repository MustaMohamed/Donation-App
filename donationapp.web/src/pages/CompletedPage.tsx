import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { TranslationConstants } from '../constants';
import { ProjectsList } from '../components';
import { ProjectsFilterService } from '../services';
import { AppState, Category, CategoryType, CountryType, ICountryFilter, IRangeFilter, Languages, Project, ProjectsWithPagination } from '../types';
import { getCompletedProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';

interface Props {
  intl: IntlShape;
  app?: AppState,
  activeCategory: Category;
  completedProjects?: ProjectsWithPagination;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  getCompletedProjects: typeof getCompletedProjectsAction;
}

interface State {
  countiesFilterValue: ICountryFilter;
  costFilterRangeValue: IRangeFilter;
  countries: { value: string, id: number }[];
  filtersRanges: IRangeFilter[];
  projects: Project[];
}

class CompletedPage extends Component<Props | any, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      countiesFilterValue: {
        value: this.props.intl.formatMessage({ id: TranslationConstants.NavigationDonations }),
        id: CountryType.AllCountries,
      },
      costFilterRangeValue: { from: 0, to: 2000, value: 'ِAll', id: 0 },
      countries: [],
      filtersRanges: [],
      projects: [],
    };
  }

  async componentDidMount() {
    await this._requestProjects();
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.activeCategory !== prevProps.activeCategory) {
      await this._requestProjects();
    }

    if (this.props.completedProjects !== prevProps.completedProjects) {
      this._constructProjectsCountries();
      this._constructCostFilterRanges();
      this._applyProjectsFilters();
    }
    if (this.state.costFilterRangeValue !== prevState.costFilterRangeValue) {
      this._applyProjectsFilters();
    }
  }


  /**
   * helper methods
   * */
  private _requestProjects = async () => {
    try {
      this.props.showUiLoader();
      await this._getProjects();
    } catch (e) {

    } finally {
      this.props.hideUiLoader();
    }
  };

  private _getProjects = async (page?: number) => {
    await this.props.getCompletedProjects(
      this.props.intl.locale || Languages.En,
      this.props.activeCategory.id !== CategoryType.AllCategories ? this.props.activeCategory.id : null,
      page);
  };

  private _constructProjectsCountries = () => {
    const countries = ProjectsFilterService
      .constructCountriesFilter(this.props.completedProjects.projects);
    countries.unshift({
      value: this.props.intl
        .formatMessage({ id: TranslationConstants.NavigationExecution }),
      id: CountryType.AllCountries,
    });
    this.setState({ countries });
  };

  private _constructCostFilterRanges = () => {
    const costRangeFilter = ProjectsFilterService
      .constructRangesFilter(this.props.completedProjects.projects)
      .map((item =>
        ({
          ...item,
          value: `$${this.props.intl.formatNumber(item.from)}-${this.props.intl.formatNumber(item.to)}`,
        })));
    const last = costRangeFilter[costRangeFilter.length - 1];
    this.setState({ filtersRanges: costRangeFilter, costFilterRangeValue: last });
  };

  private _applyProjectsFilters = () => {
    const countryFilteredProjects = ProjectsFilterService
      .applyCountryFilter(this.props.completedProjects.projects, this.state.countiesFilterValue);
    const rangesFilterProjects = ProjectsFilterService
      .applyRangeFilter(countryFilteredProjects, this.state.costFilterRangeValue);
    this.setState({ projects: rangesFilterProjects });
  };

  public onPageChange = async ({ totalPages, activePage }: any) => {
    try {
      const currentPageNumber = activePage ? activePage : this.props.completedProjects.pagination.page + 1;
      const totPages = totalPages ? totalPages : this.props.completedProjects.pagination.totalPages;
      if (currentPageNumber <= totPages) {
        this.props.showUiLoader();
        await this._getProjects(currentPageNumber);
      }
    } catch (e) {

    } finally {
      this.props.hideUiLoader();
    }
  };

  public onCountryMenuChange = (data: any) => {
    this.setState(prevState => ({ countiesFilterValue: prevState.countries[data.value] }), this._applyProjectsFilters);
  };

  public onCostRangeMenuChange = (data: any) => {
    this.setState(prevState => ({ costFilterRangeValue: prevState.filtersRanges[data.value] }), this._applyProjectsFilters);
  };

  render() {
    return (
      <Container>
        <Header size={'large'} className={'my-3'}>
          <FormattedMessage id={TranslationConstants.PagesHeaderExecution}/>
        </Header>
        {this.state.projects && <ProjectsList projects={this.state.projects}
                                              onCountryFilterChange={this.onCountryMenuChange}
                                              countiesFilterOptions={this.state.countries}
                                              onRangeFilterChange={this.onCostRangeMenuChange}
                                              rangesFilterOptions={this.state.filtersRanges}
                                              onPageChange={this.onPageChange}
                                              pagination={this.props.completedProjects.pagination}/>}
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects, app } = state;
  const { completedProjects, categories } = projects;
  const { activeCategory } = categories;
  return {
    app,
    completedProjects,
    activeCategory,
  };
};

export default connect(mapStateToProps, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
  getCompletedProjects: getCompletedProjectsAction(),
})(injectIntl(CompletedPage));
