/**
 * created by musta at 10/3/2019
 */

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContent } from '../components';
import { translationConstants } from '../constants';

class SettingsScreen extends PureComponent {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_SETTINGS_TITLE });
    return {
      title: title,
    };
  };

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
