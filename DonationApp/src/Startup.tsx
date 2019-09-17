/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { translationConstants } from './constants';

interface Props {
}

class Startup extends Component<Props> {
  render() {
    return (
      <View style={styles.startupContainer}>
        <Text>
          <FormattedMessage id={translationConstants.HELLO}/>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Startup;
