/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge, Button, Card } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { Project } from '../types';
import { colorConstants, translationConstants } from '../constants';
import Collapsible from 'react-native-collapsible';
import ProjectDetails from './ProjectDetails';
import { Progress } from './ProgressBar';

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

  render() {
    return this.props.project &&
      (<Card containerStyle={styles.cardContainer}
             wrapperStyle={styles.cardWrapper}
             image={{ uri: this.props.project.image }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={this._toggleCollapse}>
          <View style={styles.projectView}>
            <View style={styles.titlesView}>
              <Text style={[styles.text, styles.projectCountry]}>{this.props.project.country || 'Egypt'}</Text>
              <Text style={[styles.text, styles.projectTitle]}>{this.props.project.name}</Text>
            </View>
            <View style={styles.costView}>
              {this.props.project.cost && <Badge status="success"
                                                 value={`$ ${this.props.intl.formatNumber(this.props.project.cost)}`}
                                                 textStyle={styles.badgeText}
                                                 badgeStyle={styles.badge}
                                                 containerStyle={styles.badgeContainer}
              />}
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
                    title={this.props.intl.formatMessage({
                      id: translationConstants.VIEW_MORE,
                    })} onPress={this._onCardPress}/>
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
  projectView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 0,
  },
  titlesView: {
    width: '70%',
  },
  costView: {
    width: '30%',
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
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorConstants.PRIMARY_BLACK,
    textTransform: 'capitalize',
  },
  projectCountry: {
    color: colorConstants.PRIMARY_BLUE,
    fontWeight: 'bold',
    fontSize: 12,
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
    fontWeight: 'bold',
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
});

export default injectIntl(ProjectCard);