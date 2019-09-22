/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { translationConstants } from '../constants/translation';
import { Progress } from './ProgressBar';

interface Props {
  intl: IntlShape;
  onCardPress: Function;
  project: {
    id: number;
    title: string;
    description: string;
    total: number;
    done: number;
  }
}

class ProjectCard extends PureComponent<Props> {
  _onCardPress = () => {
    this.props.onCardPress && this.props.onCardPress(this.props.project);
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onCardPress}>
        {this.props.project && <Card title={this.props.project.title || ''} image={{ uri: 'https://placekitten.com/640/360' }}>
          <View>
            <Text style={styles.descriptionText}>{this.props.project.description}</Text>
          </View>
          <View style={styles.progress}>
            <Progress isRTL
                      lineWidth={12}
                      percent={this.props.project.done / this.props.project.total * 100}
                      showInfo type={'line'}
                      renderInfo={() =>
                        <Text
                          style={styles.progressText}>{`${this.props.intl.formatNumber(this.props.project.done)} ${this.props.intl.formatMessage({ id: translationConstants.FROM })} ${this.props.intl.formatNumber(this.props.project.total)}`}</Text>}/>
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
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  actionButtonText: {
    fontSize: 14,
  },
  progress: {
    marginVertical: 10,
  },
  progressText: {
    marginLeft: 10,
  },

});

export default injectIntl(ProjectCard);