/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { translationConstants } from '../constants';
import { Progress } from './ProgressBar';
import { Project } from '../types';

interface Props {
  intl: IntlShape;
  onCardPress: Function;
  project: Project
}

class ProjectCard extends PureComponent<Props> {
  _onCardPress = () => {
    this.props.onCardPress && this.props.onCardPress(this.props.project);
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onCardPress}>
        {this.props.project && <Card title={this.props.project.name || ''}
                                     containerStyle={{ borderRadius: 10, borderColor: '#E9EFF0' }}
                                     titleStyle={{ fontSize: 22, textAlign: 'left', marginLeft: 20 }}
                                     wrapperStyle={{ borderRadius: 10 }}
                                     image={{ uri: this.props.project.image }}>
          <View>
            <Text style={styles.descriptionText}>{this.props.project.description}</Text>
          </View>
          <View style={styles.progress}>
            <Progress isRTL
                      lineWidth={12}
                      percent={this.props.project.collectedDonation / this.props.project.cost * 100}
                      showInfo type={'line'}
                      renderInfo={() =>
                        <Text
                          style={styles.progressText}>{`${this.props.intl.formatNumber(this.props.project.collectedDonation)} ${this.props.intl.formatMessage({ id: translationConstants.FROM })} ${this.props.intl.formatNumber(this.props.project.cost)}`}</Text>}/>
          </View>
        </Card>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: 'left',
  },
  progress: {
    marginVertical: 10,
  },
  progressText: {
    marginLeft: 10,
  },

});

export default injectIntl(ProjectCard);