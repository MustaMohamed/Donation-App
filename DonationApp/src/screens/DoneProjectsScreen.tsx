/**
 * created by musta at 9/24/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import { getDoneProjectsAction, hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { AppState } from '../types/redux-store';
import { IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { ProjectsList, TabItem } from '../components';
import { Project } from '../types/models';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  getDoneProjects: typeof getDoneProjectsAction;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
  app: AppState;
  intl: IntlShape;
  doneProjects: Project[];
}

interface State {

}

class DoneProjectsScreen extends Component<Props, State> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONE_PROJECTS_TAB_TITLE });
    return {
      title: title,
      tabBarButtonComponent: (props) => <TabItem title={title} {...props} />,
    };
  };

  async componentDidMount() {
    console.log('Donation mounted');
    this.props.showUiLoader();
    await this.props.getDoneProjects();
    this.props.hideUiLoader();
  }

  onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  render() {
    return (
      <View style={styles.startupContainer}>
        <ProjectsList onItemPress={this.onProjectItemPress}
                      projects={this.props.doneProjects.filter(item => item.isExecutionDone)}/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { projects } = state;
  const { doneProjects } = projects;
  return { doneProjects };
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

