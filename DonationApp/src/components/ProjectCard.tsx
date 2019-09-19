/**
 * created by musta at 9/19/2019
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { Bar } from 'react-native-progress';
import { Languages } from '../types';


interface Props {
  intl: IntlShape;
  onPress: Function;
  project: {
    id: number;
    title: string;
    description: string;
    progress: number;
  }
}

class ProjectCard extends Component<Props> {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount(): void {
  }

  _onCardPress = () => {
    console.log('Card Pressed!');
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onCardPress}>
        {this.props.project && <Card title={this.props.project.title || ''} image={{ uri: 'https://placekitten.com/640/360' }}>
          <View>
            <Text style={styles.descriptionText}>{this.props.project.description}</Text>
          </View>
          <View style={[styles.progress, this.props.intl.locale === Languages.Ar ? styles.progressRTL : null]}>
            <Bar progress={this.props.project.progress} width={null} height={10}/>
          </View>
          {/* <View style={styles.cardActions}>
          <Button buttonStyle={styles.actionButton}
                  titleStyle={styles.actionButtonText}
                  title={this.props.intl.formatMessage({ id: translationConstants.CARD_ACTION_TEXT_PREV_PROJECT_WORK })}/>
          <Button buttonStyle={styles.actionButton}
                  titleStyle={styles.actionButtonText}
                  title={this.props.intl.formatMessage({ id: translationConstants.CARD_ACTION_TEXT_VILLAGE_PREV_PROJECTS })}/>
        </View>*/}
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
  progressRTL: {
    transform: [{ rotate: '180deg' }],
  },
});

export default injectIntl(ProjectCard);
