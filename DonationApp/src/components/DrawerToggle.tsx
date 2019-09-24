/**
 * created by musta at 9/24/2019
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const DrawerToggle = ({ onTogglePress }) => {
  return (
    <Icon onPress={onTogglePress} name={'bars'} type={'font-awesome'}/>
  );
};

const styles = StyleSheet.create({});

export default DrawerToggle;
