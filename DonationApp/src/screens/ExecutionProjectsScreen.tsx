/**
 * created by musta at 9/24/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Project } from '../types/models';
import { navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import { AppState } from '../types/redux-store';
import { IntlShape } from 'react-intl';
import { projects } from '../utils';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
  intl: IntlShape;
}

interface State {

}

class ExecutionProjectsScreen extends Component<Props, State> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_EXECUTION_PROJECTS_TAB_TITLE });
    return {
      title: title,
      tabBarLabel: title,
      tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
    };
  };
  onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress} projects={projects.filter(item => item.isCostCollectedDone && !item.isExecutionDone)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default ExecutionProjectsScreen;
