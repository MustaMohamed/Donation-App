/**
 * created by musta at 9/24/2019
 */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const DrawerToggle = ({ onTogglePress }) => {
  return (
    <TouchableOpacity onPress={onTogglePress}>
      <Icon color={'#E9EFF0'} name={'bars'} type={'font-awesome'}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default DrawerToggle;
