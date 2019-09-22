/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { projects } from '../utils';
import { ProjectsList } from '../components';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { Project } from '../types';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
}

class RelatedProjectsScreen extends Component<Props> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const project: Project = navigation.getParam('relatedProject');
    return {
      title: project.title,
    };
  };

  onProjectItemPress = (item: Project) => {
    // this.props.navigation.setParams({ relatedProject: item });
    this.props.navigation.push('ProjectDetails', {
      projectDetails: item,
    });
  };

  render() {
    return (
      <View style={styles.relatedProjectsView}>
        <ProjectsList onItemPress={this.onProjectItemPress} projects={projects}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relatedProjectsView: {
    flex: 1,
  },
});

export default RelatedProjectsScreen;
