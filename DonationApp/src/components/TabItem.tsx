/**
 * created by musta at 9/24/2019
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colorConstants } from '../constants';
import AppText from './AppText';

const TabItem = (props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.9} style={[...props.style, styles.tab, props.focused ? styles.touchActive : styles.touch]}>
      <View style={styles.tab}>
        {props.icon && <props.icon/>}
        <AppText style={[styles.label, props.focused && styles.activeLabel]}>{props.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    backgroundColor: colorConstants.PRIMARY_WHITE,
  },
  touchActive: {
    backgroundColor: '#ecf0f1',
  },
  tab: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  label: {
    color: colorConstants.PRIMARY_GRAY,
    textAlign: 'center',
    fontSize: 16,
  },
  activeLabel: {
    color: colorConstants.PRIMARY_BLACK,
    fontWeight: 'bold',
  },
  icon: {},
  activeIcon: {},
});

export default TabItem;
