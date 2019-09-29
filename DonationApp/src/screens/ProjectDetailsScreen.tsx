/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { Button, Image, ListItem } from 'react-native-elements';
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
    project: {
      village: {
        id: 1,
        name: 'dummy',
      },
    },
  };
  static navigationOptions = ({ screenProps, navigation }) => {
    const project = navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    return {
      title: project.name,
    };
  };

  componentDidMount(): void {
    const project = this.props.navigation.getParam(navigationConstants.SCREEN_PARAM_PROJECT);
    this.setState({ project });
  }

  _onRelatedProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Category,
    });
  };

  _onPrevProjectsActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_RELATED_PROJECTS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
      [navigationConstants.SCREEN_PARAM_RELATED_PROJECT_TYPE]: RelatedProjectsType.Village,
    });
  };

  _onDonateActionPress = () => {
    this.props.navigation.push(navigationConstants.SCREEN_DONATE_FORM, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: this.state.project,
    });
  };

  render() {
    return (
      <View style={styles.detailsContainer}>
        <ScrollView>
          <Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>

          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COUNTRY })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.state.project.country || 'Egypt'}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.VILLAGE })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.state.project.village.name || 'Egypt'}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.REASON })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            subtitle={this.state.project.description}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COST })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.props.intl.formatNumber(this.state.project.cost)}
            subtitleStyle={styles.text}
            bottomDivider
          />
          {!this.state.project.isCostCollectedDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COLLECTED_DONATION })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.props.intl.formatNumber(this.state.project.collectedDonation)}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isCostCollectedDone && < ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.EXECUTION_DURATION })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.state.project.executionDuration}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isExecutionDone && this.state.project.result && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.RESULT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            subtitle={this.state.project.result}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isCostCollectedDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.START_AT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.props.intl.formatDate(this.state.project.startAt ? this.state.project.startAt : new Date(), {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isCostCollectedDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.EXPECTED_END_AT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.props.intl.formatDate(this.state.project.expectedEndAt ? this.state.project.expectedEndAt : new Date(), {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isExecutionDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.END_AT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            rightSubtitle={this.props.intl.formatDate(this.state.project.endAt ? this.state.project.endAt : new Date(), {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
            subtitleStyle={styles.text}
            bottomDivider
          />}
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

        </ScrollView>
        <Button buttonStyle={styles.actionBtn}
                titleStyle={styles.actionBtnText}
                title={this.props.intl.formatMessage({
                  id: translationConstants.DONATE,
                })} onPress={this._onDonateActionPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  image: {
    height: 200,
  },
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
  text: {
    textAlign: 'left',
  },
  listItemTitle: {
    fontWeight: 'bold', fontSize: 16,
  },
});

export default injectIntl(ProjectDetailsScreen);
