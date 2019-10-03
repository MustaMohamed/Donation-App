/**
 * created by musta at 9/19/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge, Card } from 'react-native-elements';
import { injectIntl, IntlShape } from 'react-intl';
import { Project } from '../types';
import { colorConstants } from '../constants';

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
        {this.props.project &&
        <Card containerStyle={styles.cardContainer}
              wrapperStyle={styles.cardWrapper}
              image={{ uri: this.props.project.image }}
        >
          <View style={styles.projectView}>
            <View style={styles.titlesView}>
              <Text style={[styles.text, styles.projectCountry]}>{this.props.project.country || 'Egypt'}</Text>
              <Text style={[styles.text, styles.projectTitle]}>{this.props.project.name}</Text>
            </View>
            <View style={styles.costView}>
              <Badge status="success"
                     value={this.props.intl.formatNumber(this.props.project.cost, {
                       style: 'currency', currency: 'USD', currencyDisplay: 'symbol',
                     })}
                     textStyle={styles.badgeText}
                     badgeStyle={styles.badge}
              />
            </View>
          </View>
        </Card>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 10,
    borderColor: '#E9EFF0',
  },
  cardWrapper: {
    borderRadius: 10,
  },
  projectView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  titlesView: {
    width: '40%',
  },
  costView: {
    width: '40%',
  },
  badge: {
    padding: 10,
    paddingVertical: 15,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 16,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colorConstants.PRIMARY_BLACK,
    textTransform: 'capitalize',
  },
  projectCountry: {
    color: colorConstants.PRIMARY_BLUE,
    fontWeight: 'bold',
  },
});

export default injectIntl(ProjectCard);