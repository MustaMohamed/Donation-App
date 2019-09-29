/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProjectsList } from '../components';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { Project, RelatedProjectsType } from '../types';
import { apiConstants, navigationConstants } from '../constants';
import { connect } from 'react-redux';
import { hideUiLoaderAction, showUiLoaderAction } from '../redux-store/actions';
import { projectsService } from '../services';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  showUiLoader: typeof showUiLoaderAction;
  hideUiLoader: typeof hideUiLoaderAction;
}

interface State {
  projects: Project[]
}

class RelatedProjectsScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  static navigationOptions = ({ screenProps, navigation }) => {
    const project: Project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
    };
  };

  async componentDidMount() {
    this.props.showUiLoader();
    const relatedProjectsType: RelatedProjectsType = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE);
    const project: Project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    const relatedType = relatedProjectsType ===
    RelatedProjectsType.Village ? apiConstants.RELATED_PROJECTS_VILLAGE : apiConstants.RELATED_PROJECTS_CATEGORY;
    const relatedId = relatedProjectsType === RelatedProjectsType.Village ? project.village.id : project.projectCategory.id;
    const data = await projectsService.getRelatedProjects(relatedType, relatedId);
    this.setState({ projects: data.projects });
    this.props.hideUiLoader();
  }

  onProjectItemPress = (item: Project) => {
    // this.props.navigation.setParams({ relatedProject: item });
    this.props.navigation.push(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  render() {
    return (
      <View style={styles.relatedProjectsView}>
        <ProjectsList onItemPress={this.onProjectItemPress} projects={this.state.projects}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relatedProjectsView: {
    flex: 1,
  },
});


export default connect(null, {
  showUiLoader: showUiLoaderAction,
  hideUiLoader: hideUiLoaderAction,
})(RelatedProjectsScreen);
