/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { Filters, ProjectsList } from '../components';
import { Language, Languages, Project, ProjectsWithPagination } from '../types';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getDonationProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { IntlShape } from 'react-intl';
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
  categoryFilterValue: string;
  costFilterRange: {
    value: string;
    from: number;
    to: number;
    id: number;
  };
}

class DonationProjectsScreen extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categoryFilterValue: 'All Categories',
      costFilterRange: {
        value: '$100 - 500',
        from: 100,
        to: 500,
        id: 0,
      },
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
  
  _onCategoryMenuChange = (value) => {
    this.setState({ categoryFilterValue: value });
  };

  _onCostRangeMenuChange = (value) => {
    this.setState({ costFilterRange: value });
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <Filters categoriesData={[{ value: 'A', id: 1 }, { value: 'B', id: 2 }]}
                 costFilterData={[{ value: '$100 - 300', from: 100, to: 300, id: 1 }, { value: '$300 - 800', from: 300, to: 800, id: 2 }]}
                 onCategoryValueChange={this._onCategoryMenuChange}
                 onFilterRangeChange={this._onCostRangeMenuChange}
        />
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.props.donationProjects.projects.filter(item => item.cost >= this.state.costFilterRange.from && item.cost <= this.state.costFilterRange.to)}/>
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
})(DonationProjectsScreen);

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