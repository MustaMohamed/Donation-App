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
import { FilterRange, Language, Languages } from '../types';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getDoneProjects: typeof getDoneProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  language: Language;
  intl: IntlShape;
  doneProjects: ProjectsWithPagination;
}

interface State {
  countiesFilterValue: {
    value: string;
    id: number;
  };
  costFilterRangeValue: FilterRange;
  countries: { value: string, id: number }[];
  filtersRanges: FilterRange[];
  projects: Project[];
}

class FinishedProjectsScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      countiesFilterValue: {
        value: this.props.intl.formatMessage({ id: translationConstants.FILTER_ALL_COUNTRIES }),
        id: -1,
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
      // tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
    };
  };

  async componentDidMount() {
    try {
      this.props.showUiLoader();
      await this._refreshProjectsList();
      this.props.hideUiLoader();
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.SHORT);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.doneProjects !== prevProps.doneProjects) {
      this._constructProjectsCountries();
      this._constructCostFilterRanges();
      this._applyProjectsFilter();
    }
  }


  _constructProjectsCountries = () => {
    let countries = this.props.doneProjects.projects.map((item, idx) => ({ value: item.country, id: idx })).filter(item => item.value !== undefined);
    countries.unshift({ value: this.props.intl.formatMessage({ id: translationConstants.FILTER_ALL_COUNTRIES }), id: -1 });
    this.setState({ countries: [...new Set(countries)] });
  };

  _constructCostFilterRanges = () => {
    const sortedItem = this.props.doneProjects.projects.sort((first, second) => (first.cost > second.cost ? 1 : (first.cost < second.cost ? -1 : 0)))
      .map(item => item.cost);
    const distinct = new Set<number>(sortedItem);
    const costsList = [...distinct];
    let lastSelectedRange = 0;
    const filterRanges: FilterRange[] = costsList.map((item, idx) => {
      if (idx % 4 == 0 || costsList.length === idx + 1) {
        const last = lastSelectedRange;
        lastSelectedRange = item;
        return {
          value: `$${this.props.intl.formatNumber(last)}-${this.props.intl.formatNumber(lastSelectedRange)}`,
          from: last,
          to: lastSelectedRange,
          id: idx,
        };
      }
    });
    filterRanges.unshift({
      value: `$${this.props.intl.formatNumber(0)}-${this.props.intl.formatNumber(lastSelectedRange)}`,
      from: 0,
      to: lastSelectedRange,
      id: -1,
    });
    this.setState({ filtersRanges: filterRanges });
  };

  _applyProjectsFilter = () => {
    this.setState({
      projects: this.props.doneProjects.projects.filter(
        item => (((item.cost <= this.state.costFilterRangeValue.to && item.cost >= this.state.costFilterRangeValue.from) || this.state.costFilterRangeValue.id === -1)
          && (item.country === this.state.countiesFilterValue.value || this.state.countiesFilterValue.id === -1))),
    });
  };

  onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: { name: item.name, id: item.id },
    });
  };

  onProjectsListRefresh = async () => {
    await this._refreshProjectsList();
  };

  onEndReached = async () => {
    const currentPageNumber = this.props.doneProjects.pagination.page;
    const totalPages = this.props.doneProjects.pagination.totalPages;
    if (currentPageNumber < totalPages) {
      this.props.showUiLoader();
      await this._refreshProjectsList(currentPageNumber + 1);
      this.props.hideUiLoader();
    }
  };

  _refreshProjectsList = async (page?: number) => {
    await this.props.getDoneProjects(this.props.language.currentLanguage || Languages.En, page);
  };

  onCountryMenuChange = (value) => {
    this.setState({ countiesFilterValue: value });
    this._applyProjectsFilter();
  };

  _onCostRangeMenuChange = (value) => {
    this.setState({ costFilterRangeValue: value });
    this._applyProjectsFilter();
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <Filters countriesData={this.state.countries}
                 costFilterData={this.state.filtersRanges}
                 defaultRangeValue={this.state.filtersRanges[0] && this.state.filtersRanges[0].value}
                 defaultCountryValue={this.state.countries[0] && this.state.countries[0].value}
                 onCountryValueChange={this.onCountryMenuChange}
                 onFilterRangeChange={this._onCostRangeMenuChange}

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
  const { doneProjects } = projects;
  const { language } = app;
  return { doneProjects, language };
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

