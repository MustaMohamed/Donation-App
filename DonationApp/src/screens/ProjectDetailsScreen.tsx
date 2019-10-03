/**
 * created by musta at 9/22/2019
 */

import React, { PureComponent } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationParams, NavigationState } from 'react-navigation';
import { Project, RelatedProjectsType } from '../types';
import { injectIntl, IntlShape } from 'react-intl';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { Button, Image, ListItem } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import { Progress } from '../components';

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
          <Image source={{ uri: this.state.project.image }} containerStyle={styles.image}/>
          {this.state.project.cost && <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.projectTitle}>{this.state.project.name}</Text>
            <Progress isRTL
                      style={styles.progress}
                      color={colorConstants.PRIMARY_BLUE}
                      lineWidth={12}
                      percent={this.state.project.collectedDonation / this.state.project.cost * 100}
                      showInfo={false}
                      type={'line'}/>
            <Text style={styles.costText}>
              {`${this.props.intl.formatNumber(this.state.project.collectedDonation, {
                style: 'currency',
                currency: 'EGP',
                currencyDisplay: 'symbol',
                maximumFractionDigits: 0,
              })} ${this.props.intl.formatMessage({ id: translationConstants.FROM })} ${this.props.intl.formatNumber(this.state.project.cost, {
                  style: 'currency',
                  currency: 'EGP',
                  currencyDisplay: 'symbol',
                  maximumFractionDigits: 0,
                },
              )}`}
            </Text>
          </View>}
          {/* <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.state.project.gallery}
            renderItem={this._renderGalleryItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width / 1.2}
            loop
          />*/}
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
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  listItemStyle: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  image: {
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateBtn: {
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
  },
  donateView: {
    paddingVertical: 10,
    padding: 10,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colorConstants.PRIMARY_WHITE,
  },
  text: {
    textAlign: 'left',
  },
  listItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colorConstants.PRIMARY_BLACK,
  },
  progress: {
    marginVertical: 10,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colorConstants.PRIMARY_BLACK,
    marginVertical: 10,
  },
  costText: {
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default injectIntl(ProjectDetailsScreen);
