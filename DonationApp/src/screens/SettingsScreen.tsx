/**
 * created by musta at 10/3/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContent } from '../components';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DrawerContent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default SettingsScreen;
