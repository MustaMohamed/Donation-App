/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { translationConstants } from '../constants/translation';
import { Button } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  intl: IntlShape;
}

interface State {
  project: Project
}

class ProjectDetailsScreen extends PureComponent<Props, State> {
  state = {
    project: new Project(),
  };
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam('projectDetails');
    return {
      title: project.title,
    };
  };

  componentDidMount(): void {
    const project = this.props.navigation.getParam('projectDetails');
    this.setState({ project });
  }

  _onRelatedProjectsActionPress = () => {
    this.props.navigation.push('RelatedProjects', {
      relatedProject: this.state.project,
    });
  };

  _onPrevProjectsActionPress = () => {
    this.props.navigation.push('RelatedProjects', {
      relatedProject: this.state.project,
    });
  };

  render() {
    return (
      <View>
        <Text>{this.state.project.title}</Text>
        <Text>{this.state.project.description}</Text>
        <Text>{this.state.project.total}</Text>
        <Text>{this.state.project.done}</Text>
        <View style={styles.actionsView}>
          <Button buttonStyle={styles.actionBtn}
                  titleStyle={styles.actionBtnText}
                  title={this.props.intl.formatMessage({
                    id: translationConstants.PROJECT_ACTION_TEXT_VILLAGE_PREV_PROJECTS,
                  })} onPress={this._onPrevProjectsActionPress}/>
          <Button buttonStyle={styles.actionBtn}
                  titleStyle={styles.actionBtnText}
                  title={this.props.intl.formatMessage({
                    id: translationConstants.PROJECT_ACTION_TEXT_PREV_PROJECT_WORK,
                  })} onPress={this._onRelatedProjectsActionPress}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  actionBtnText: {
    fontSize: 14,
  },
});

export default injectIntl(ProjectDetailsScreen);
