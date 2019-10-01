/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Project, ProjectsWithPagination } from '../types/models';
import { navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getExecutionProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { IntlShape } from 'react-intl';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';
import { Language, Languages } from '../types';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getExecutionProjects: typeof getExecutionProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  language: Language;
  intl: IntlShape;
  executionProjects: ProjectsWithPagination;
}

interface State {

}

class ExecutionProjectsScreen extends PureComponent<Props, State> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_EXECUTION_PROJECTS_TAB_TITLE });
    return {
      title: title,
      tabBarLabel: title,
      tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
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
    const currentPageNumber = this.props.executionProjects.pagination.page;
    const totalPages = this.props.executionProjects.pagination.totalPages;
    if (currentPageNumber < totalPages) {
      this.props.showUiLoader();
      await this._refreshProjectsList(currentPageNumber + 1);
      this.props.hideUiLoader();
    }
  };

  _refreshProjectsList = async (page?: number) => {
    await this.props.getExecutionProjects(this.props.language.currentLanguage || Languages.En, page);
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.props.executionProjects.projects}/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects, app } = state;
  const { executionProjects } = projects;
  const { language } = app;
  return { executionProjects, language };
};

export default connect(mapStateToProps, {
  getExecutionProjects: getExecutionProjectsAction,
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(ExecutionProjectsScreen);

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(47, 174, 144, 0.2)',
  },
});