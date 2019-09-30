/**
 * created by musta at 9/24/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Project } from '../types/models';
import { navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getExecutionProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { AppState } from '../types/redux-store';
import { IntlShape } from 'react-intl';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getExecutionProjects: typeof getExecutionProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  app: AppState;
  intl: IntlShape;
  executionProjects: Project[];
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

  onEndReached = () => {
    console.log('the end list');
  };
  
  _refreshProjectsList = async () => {
    console.log('list refresh');
    await this.props.getExecutionProjects();
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress}
                      onListRefresh={this.onProjectsListRefresh}
                      onEndReached={this.onEndReached}
                      projects={this.props.executionProjects}/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects } = state;
  const { executionProjects } = projects;
  return { executionProjects };
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
  },
});