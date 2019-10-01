/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getDoneProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
import { Project, ProjectsWithPagination } from '../types/models';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { Language, Languages } from '../types';

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

}

class DoneProjectsScreen extends PureComponent<Props, State> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONE_PROJECTS_TAB_TITLE });
    return {
      title: title,
      tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
    };
  };

  async componentDidMount() {
    this.props.showUiLoader();
    await this._refreshProjectsList;
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

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.props.doneProjects.projects}/>
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
})(DoneProjectsScreen);

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

