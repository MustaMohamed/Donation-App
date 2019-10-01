/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { Button, Image, ListItem } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import Carousel from 'react-native-snap-carousel';

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
    } as Project,
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

  _renderGalleryItem({ item, index }) {
    return (
      <Image
        containerStyle={styles.image}
        source={{ uri: item }}
      />
    );
  }

  render() {
    return (
      <View style={styles.detailsContainer}>
        <ScrollView>
          {/*<Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>*/}

          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.project.gallery}
            renderItem={this._renderGalleryItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width / 1.2}
            loop
          />


          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COUNTRY })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle}
            rightSubtitle={this.state.project.country || 'Egypt'}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.VILLAGE })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} rightSubtitle={this.state.project.village.name || 'Egypt'}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.DESCRIPTION })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} subtitle={this.state.project.description}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.REASON })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} subtitle={this.state.project.cause}
            subtitleStyle={styles.text}
            bottomDivider
          />
          <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COST })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} rightSubtitle={this.props.intl.formatNumber(this.state.project.cost)}
            subtitleStyle={styles.text}
            bottomDivider
          />
          {!this.state.project.isCostCollectedDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.COLLECTED_DONATION })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} rightSubtitle={this.props.intl.formatNumber(this.state.project.collectedDonation)}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isCostCollectedDone && < ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.EXECUTION_DURATION })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} rightSubtitle={this.state.project.executionDuration}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isExecutionDone && this.state.project.result && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.RESULT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} subtitle={this.state.project.result}
            subtitleStyle={styles.text}
            bottomDivider
          />}
          {this.state.project.isCostCollectedDone && <ListItem
            title={this.props.intl.formatMessage({ id: translationConstants.START_AT })}
            titleProps={{ style: [styles.text, styles.listItemTitle] }}
            containerStyle={styles.listItemStyle} rightSubtitle={this.props.intl.formatDate(this.state.project.startAt ? this.state.project.startAt : new Date(), {
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
            containerStyle={styles.listItemStyle} rightSubtitle={this.props.intl.formatDate(this.state.project.expectedEndAt ? this.state.project.expectedEndAt : new Date(), {
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
            containerStyle={styles.listItemStyle} rightSubtitle={this.props.intl.formatDate(this.state.project.endAt ? this.state.project.endAt : new Date(), {
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
          <View style={styles.donateView}>
            <Button buttonStyle={styles.donateBtn}
                    titleStyle={styles.actionBtnText}
                    title={this.props.intl.formatMessage({
                      id: translationConstants.DONATE,
                    })} onPress={this._onDonateActionPress}/>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(47, 174, 144, 0.1)',
  },
  listItemStyle: {
    backgroundColor: 'rgba(47, 174, 144, 0.1)',
  },
  image: {
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(47, 174, 144, 0.1)',
  },
  actionBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#058256',
    borderRadius: 20,
  },
  donateBtn: {
    backgroundColor: '#058256',
    borderRadius: 20,
  },
  donateView: {
    paddingVertical: 10,
    padding: 10,
    backgroundColor: 'rgba(47, 174, 144, 0.1)',
  },
  actionBtnText: {
    fontSize: 14,
  },
  text: {
    textAlign: 'left',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#058256',
  },
});

export default injectIntl(ProjectDetailsScreen);
