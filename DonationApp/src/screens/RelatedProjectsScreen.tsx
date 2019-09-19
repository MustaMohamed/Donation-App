/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { projects } from '../utils';
import { ProjectsList } from '../components';
import { translationConstants } from '../constants/translation';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class RelatedProjectsScreen extends Component<Props> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam('relatedProject');
    const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
    return {
      title: project.title,
    };
  };

  onProjectItemPress = (item) => {
    // this.props.navigation.setParams({ relatedProject: item });
    this.props.navigation.navigate('RelatedProjects', {
      relatedProject: item,
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
