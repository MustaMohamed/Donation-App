/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Button, Card, Icon } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { Project } from '../types';
import { colorConstants, translationConstants } from '../constants';
import Collapsible from 'react-native-collapsible';
import ProjectDetails from './ProjectDetails';
import { Progress } from './ProgressBar';
import AppText from './AppText';
import numeral from 'numeral';

interface Props {
  intl: IntlShape;
  onCardPress: Function;
  project: Project
}

interface State {
  isDetailsCollapsed: boolean;
}

class ProjectCard extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isDetailsCollapsed: true,
    };
  }

  _onCardPress = () => {
    this.props.onCardPress && this.props.onCardPress(this.props.project);
  };

  _toggleCollapse = () => {
    this.setState(prevState => ({ isDetailsCollapsed: !prevState.isDetailsCollapsed }));
  };

  _renderCost = (cost?: number) => {
    const formattedCost = numeral(cost).format('0.0a');
    const numbers = formattedCost.match(/\d+/g);
    const integer = this.props.intl.formatNumber(numbers[0]);
    const decimal = this.props.intl.formatNumber(numbers[1]);
    const tag = formattedCost.replace(/[0-9|.|,]/g, '');
    return `${integer}${numbers[1] != 0 ? '.' + decimal : ''} ${tag}`;
  };

  render() {
    return this.props.project &&
      (<Card containerStyle={styles.cardContainer}
             wrapperStyle={styles.cardWrapper}
             imageWrapperStyle={styles.imageWrapper}
             image={{ uri: this.props.project.image }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={this._toggleCollapse}>
          <View style={styles.projectView}>
            <View style={styles.titlesView}>
              <AppText bold style={{ color: colorConstants.PRIMARY_GRAY }} small>{this.props.project.country || 'مصر'}</AppText>
              <AppText bold style={[styles.projectTitle]} text={this.props.project.name}/>
            </View>
            <View style={styles.costView}>
              {this.props.project.cost && <Badge status='success'
                                                 value={`$ ${this._renderCost(this.props.project.cost)}`}
                                                 textStyle={styles.badgeText}
                                                 badgeStyle={styles.badge}
                                                 containerStyle={styles.badgeContainer}
              />}

            </View>
            <View style={styles.collapsedIcon}>
              <Icon name={this.state.isDetailsCollapsed ? 'down' : 'up'} type={'antdesign'}/>
            </View>
          </View>
          {this.state.isDetailsCollapsed && <Progress isRTL
                                                      style={styles.progress}
                                                      color={colorConstants.PRIMARY_BLUE}
                                                      lineWidth={12}
                                                      percent={Math.min(this.props.project.collectedDonation / this.props.project.cost * 100, 100)}
                                                      showInfo={false}
                                                      type={'line'}/>}
        </TouchableOpacity>
        <Collapsible collapsed={this.state.isDetailsCollapsed}>
          <ProjectDetails project={this.props.project}/>
          <View style={styles.actionBtnView}>

            <Button buttonStyle={styles.actionBtn}
                    titleStyle={styles.actionBtnText}
                    title={<AppText bold text={this.props.intl.formatMessage({
                      id: translationConstants.VIEW_MORE,
                    })}/>}
                    onPress={this._onCardPress}>

            </Button>
          </View>
        </Collapsible>
      </Card>);
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 10,
    borderColor: '#E9EFF0',
    marginVertical: 20,
  },
  cardWrapper: {
    borderRadius: 10,
  },
  imageWrapper: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  projectView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 0,
  },
  titlesView: {
    width: '60%',
  },
  costView: {
    width: '40%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colorConstants.PRIMARY_GREEN,
  },
  badgeContainer: {},
  badgeText: {
    fontSize: 16,
    fontFamily: 'Tajawal-Regular',
  },
  projectTitle: {
    fontSize: 18,
    color: colorConstants.PRIMARY_BLACK,
    textTransform: 'capitalize',
  },
  projectCountry: {
    color: colorConstants.PRIMARY_BLUE,
  },
  actionBtn: {
    paddingHorizontal: 45,
    paddingVertical: 10,
    backgroundColor: colorConstants.PRIMARY_BLUE,
    borderRadius: 20,
    marginVertical: 15,
  },
  actionBtnText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: colorConstants.PRIMARY_WHITE,
  },
  actionBtnView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progress: {
    marginVertical: 10,
  },
  collapsedIcon: {
    marginLeft: 20,
    marginTop: 5,
  },
});

export default injectIntl(ProjectCard);