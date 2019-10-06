/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
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

}

class DonationProjectsScreen extends PureComponent<Props, State> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONATION_PROJECTS_TAB_TITLE });
    return {
      title: title,
      // tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
      tabBarIcon: <Icon name={'rightcircle'} type={'antdesign'}/>,
    };
  };

  async componentDidMount() {
    this.props.showUiLoader();
    await this._refreshProjectsList();
    this.props.hideUiLoader();
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
    const currentPageNumber = this.props.donationProjects.pagination.page;
    const totalPages = this.props.donationProjects.pagination.totalPages;
    if (currentPageNumber < totalPages) {
      this.props.showUiLoader();
      await this._refreshProjectsList(currentPageNumber + 1);
      this.props.hideUiLoader();
    }
  };

  _refreshProjectsList = async (page?: number) => {
    await this.props.getDonationProjects(this.props.language.currentLanguage || Languages.En, page);
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.props.donationProjects.projects}/>
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
});