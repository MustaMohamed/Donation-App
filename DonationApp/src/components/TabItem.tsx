/**
 * created by musta at 9/24/2019
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TabItem = (props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.9} style={[...props.style, styles.tab, props.focused ? styles.touchActive : styles.touch]}>
      <View style={styles.tab}>
        {props.icon && <props.icon/>}
        <Text style={[styles.label, props.focused && styles.activeLabel]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    backgroundColor: 'rgba(34, 166, 179,1.0)',
  },
  touchActive: {
    backgroundColor: 'rgba(34, 166, 179,0.8)',
  },
  tab: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  label: {
    color: 'rgba(126, 214, 223,1.0)',
    textAlign: 'center',
    fontSize: 16,
  },
  activeLabel: {
    color: 'rgba(236, 240, 241,1.0)',
    fontWeight: 'bold',
  },
  icon: {},
  activeIcon: {},
});

export default TabItem;
