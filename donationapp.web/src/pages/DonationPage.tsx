import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { TranslationConstants } from '../constants';
import { ProjectsList } from '../components';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { AppState, Category, CategoryType, CountryType, ICountryFilter, IRangeFilter, Languages, Project, ProjectsWithPagination } from '../types';
import { getDonationProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { ProjectsFilterService } from '../services';


interface Props {
  intl: IntlShape;
  app?: AppState,
  activeCategory: Category;
  donationProjects?: ProjectsWithPagination;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  getDonationProjects: typeof getDonationProjectsAction;
}

interface State {
  countiesFilterValue: ICountryFilter;
  costFilterRangeValue: IRangeFilter;
  countries: { value: string, id: number }[];
  filtersRanges: IRangeFilter[];
  projects: Project[];
}

class DonationPage extends Component<Props | any, State> {
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

    if (this.props.donationProjects !== prevProps.donationProjects) {
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
    await this.props.getDonationProjects(
      this.props.intl.locale || Languages.En,
      this.props.activeCategory.id !== CategoryType.AllCategories ? this.props.activeCategory.id : null,
      page);
  };

  private _constructProjectsCountries = () => {
    const countries = ProjectsFilterService
      .constructCountriesFilter(this.props.donationProjects.projects);
    countries.unshift({
      value: this.props.intl
        .formatMessage({ id: TranslationConstants.NavigationDonations }),
      id: CountryType.AllCountries,
    });
    this.setState({ countries });
  };

  private _constructCostFilterRanges = () => {
    const costRangeFilter = ProjectsFilterService
      .constructRangesFilter(this.props.donationProjects.projects)
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
      .applyCountryFilter(this.props.donationProjects.projects, this.state.countiesFilterValue);
    const rangesFilterProjects = ProjectsFilterService
      .applyRangeFilter(countryFilteredProjects, this.state.costFilterRangeValue);
    this.setState({ projects: rangesFilterProjects });
  };

  public onPageChange = async ({ totalPages, activePage }: any) => {
    try {
      const currentPageNumber = activePage ? activePage : this.props.donationProjects.pagination.page + 1;
      const totPages = totalPages ? totalPages : this.props.donationProjects.pagination.totalPages;
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
          <FormattedMessage id={TranslationConstants.PagesHeaderDonation}/>
        </Header>
        {this.state.projects && <ProjectsList projects={this.state.projects}
                                              onCountryFilterChange={this.onCountryMenuChange}
                                              countiesFilterOptions={this.state.countries}
                                              onRangeFilterChange={this.onCostRangeMenuChange}
                                              rangesFilterOptions={this.state.filtersRanges}
                                              onPageChange={this.onPageChange}
                                              pagination={this.props.donationProjects.pagination}/>}
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects, app } = state;
  const { donationProjects, categories } = projects;
  const { activeCategory } = categories;
  return {
    app,
    donationProjects,
    activeCategory,
  };
};

export default connect(mapStateToProps, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
  getDonationProjects: getDonationProjectsAction,
})(injectIntl(DonationPage));