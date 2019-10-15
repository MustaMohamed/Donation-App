/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { Filters, ProjectsList } from '../components';
import { FilterRange, Language, Languages, Project, ProjectsWithPagination } from '../types';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getDonationProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { injectIntl, IntlShape } from 'react-intl';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getDonationProjects: typeof getDonationProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  language: Language;
  intl: IntlShape;
  donationProjects: ProjectsWithPagination;
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

class DonationProjectsScreen extends PureComponent<Props, State> {
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
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONATION_PROJECTS_TAB_TITLE });
    return {
      title: title,
      // tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
      tabBarIcon: <Icon name={'rightcircle'} type={'antdesign'}/>,
    };
  };

  async componentDidMount() {
    try {
      this.props.showUiLoader();
      await this._refreshProjectsList();
      this.props.hideUiLoader();
    } catch (e) {
      ToastAndroid.show(e.errorMessage, ToastAndroid.SHORT);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.donationProjects !== prevProps.donationProjects) {
      this._constructProjectsCountries();
      this._constructCostFilterRanges();
      this._applyProjectsFilter();
    }
  }

  _constructProjectsCountries = () => {
    let countries = this.props.donationProjects.projects.map((item, idx) => ({ value: item.country, id: idx })).filter(item => item.value !== undefined);
    countries.unshift({ value: this.props.intl.formatMessage({ id: translationConstants.FILTER_ALL_COUNTRIES }), id: -1 });
    this.setState({ countries: countries });
  };

  _constructCostFilterRanges = () => {
    const sortedItem = this.props.donationProjects.projects.sort((first, second) => (first.cost > second.cost ? 1 : (first.cost < second.cost ? -1 : 0)))
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
    console.log(filterRanges);
  };

  _applyProjectsFilter = () => {
    this.setState({
      projects: this.props.donationProjects.projects.filter(
        item => ((item.cost <= this.state.costFilterRangeValue.to && item.cost >= this.state.costFilterRangeValue.from)
          && (item.country === this.state.countiesFilterValue.value || this.state.countiesFilterValue.id === -1))),
    });
  };

  onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  onProjectsListRefresh = async () => {
    await this._refreshProjectsList();
  };

  onEndReached = async () => {
    try {
      const currentPageNumber = this.props.donationProjects.pagination.page;
      const totalPages = this.props.donationProjects.pagination.totalPages;
      if (currentPageNumber < totalPages) {
        this.props.showUiLoader();
        await this._refreshProjectsList(currentPageNumber + 1);
        this.props.hideUiLoader();
      }
    } catch (e) {
      ToastAndroid.show(e.errorMessage, ToastAndroid.SHORT);
    }
  };

  _refreshProjectsList = async (page?: number) => {
    await this.props.getDonationProjects(this.props.language.currentLanguage || Languages.En, page);
  };

  onCountryMenuChange = (value) => {
    this.setState({ countiesFilterValue: value });
  };

  _onCostRangeMenuChange = (value) => {
    this.setState({ costFilterRangeValue: value });
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
  const { donationProjects } = projects;
  const { language } = app;
  return { donationProjects, language };
};

export default connect(mapStateToProps, {
  getDonationProjects: getDonationProjectsAction,
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(injectIntl(DonationProjectsScreen));

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