/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getDoneProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { injectIntl, IntlShape } from 'react-intl';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { Filters, ProjectsList } from '../components';
import { Project, ProjectsWithPagination } from '../types/models';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { Category, CategoryType, CountryType, IRangeFilter, Language, Languages } from '../types';
import { ProjectsFilterService } from '../services';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getDoneProjects: typeof getDoneProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  activeCategory: Category;
  language: Language;
  intl: IntlShape;
  doneProjects: ProjectsWithPagination;
}

interface State {
  countiesFilterValue: {
    value: string;
    id: number;
  };
  costFilterRangeValue: IRangeFilter;
  countries: { value: string, id: number }[];
  filtersRanges: IRangeFilter[];
  projects: Project[];
}

class FinishedProjectsScreen extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      countiesFilterValue: {
        value: this.props.intl.formatMessage({ id: translationConstants.FILTER_ALL_COUNTRIES }),
        id: CountryType.AllCountries,
      },
      costFilterRangeValue: { from: 0, to: 2000, value: 'ِAll', id: 0 },
      countries: [],
      filtersRanges: [],
      projects: [],
    };
  }

  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONE_PROJECTS_TAB_TITLE });
    return {
      title: title,
      tabBarLabel: title,
    };
  };

  async componentDidMount() {
    await this._requestProjects();
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.activeCategory !== prevProps.activeCategory) {
      await this._requestProjects();
    }
    if (this.props.doneProjects !== prevProps.doneProjects) {
      this._constructProjectsCountries();
      this._constructCostFilterRanges();
      this._applyProjectsFilters();
    }
    if (this.state.costFilterRangeValue != prevState.costFilterRangeValue) {
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
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      this.props.hideUiLoader();
    }
  };

  private _getProjects = async (page?: number) => {
    await this.props.getDoneProjects(
      this.props.language.currentLanguage || Languages.En,
      this.props.activeCategory.id !== CategoryType.AllCategories ? this.props.activeCategory.id : null,
      page);
  };

  private _constructProjectsCountries = () => {
    const countries = ProjectsFilterService
      .constructCountriesFilter(this.props.doneProjects.projects);
    countries.unshift({
      value: this.props.intl
        .formatMessage({ id: translationConstants.FILTER_ALL_COUNTRIES }),
      id: CountryType.AllCountries,
    });
    this.setState({ countries });
  };

  private _constructCostFilterRanges = () => {
    const costRangeFilter = ProjectsFilterService
      .constructRangesFilter(this.props.doneProjects.projects)
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
      .applyCountryFilter(this.props.doneProjects.projects, this.state.countiesFilterValue);
    const rangesFilterProjects = ProjectsFilterService
      .applyRangeFilter(countryFilteredProjects, this.state.costFilterRangeValue);
    this.setState({ projects: rangesFilterProjects });
  };

  /**
   * events and callbacks
   * */
  public onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: { name: item.name, id: item.id },
    });
  };

  public onProjectsListRefresh = async () => {
    try {
      await this._getProjects();
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    }
  };

  public onEndReached = async () => {
    try {
      const currentPageNumber = this.props.doneProjects.pagination.page;
      const totalPages = this.props.doneProjects.pagination.totalPages;
      if (currentPageNumber < totalPages) {
        this.props.showUiLoader();
        await this._getProjects(currentPageNumber + 1);
      }
    } catch (e) {
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      this.props.hideUiLoader();
    }
  };

  public onCountryMenuChange = (value) => {
    this.setState({ countiesFilterValue: value }, this._applyProjectsFilters);
  };

  public onCostRangeMenuChange = (value) => {
    this.setState({ costFilterRangeValue: value }, this._applyProjectsFilters);
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <Filters countriesData={this.state.countries}
                 costFilterData={this.state.filtersRanges}
                 defaultRangeValue={this.state.filtersRanges[0] && this.state.filtersRanges[0].value}
                 defaultCountryValue={this.state.countries[0] && this.state.countries[0].value}
                 onCountryValueChange={this.onCountryMenuChange}
                 onFilterRangeChange={this.onCostRangeMenuChange}

        />
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.state.projects}/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects, app } = state;
  const { doneProjects, categories } = projects;
  const { activeCategory } = categories;
  const { language } = app;
  return { doneProjects, language, activeCategory };
};
export default connect(mapStateToProps, {
  getDoneProjects: getDoneProjectsAction,
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(FinishedProjectsScreen));

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colorConstants.SECONDARY_WHITE,
  },
  filtersView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  dropdownContainer: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
    width: '49.5%',
    height: 50,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
});

