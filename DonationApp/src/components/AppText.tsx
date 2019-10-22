/**
 * created by musta at 10/21/2019
 */

import React from 'react';
import { StyleProp, StyleSheet, Text } from 'react-native';

interface Props {
  style?: StyleProp<any>[] | StyleProp<any>;
  text?: string;
  bold?: boolean;
  light?: boolean;
  small?: boolean;
  children?: any;
}

const AppText = ({ style, text, bold, light, small, children, ...rest }: Props) => {
  return (
    <Text style={[styles.text, styles.textFont, bold && styles.textBold, light && styles.textLight, small && styles.textSmall, style]}>{text || children}</Text>
  );
};

const styles = StyleSheet.create({
  textFont: {
    fontFamily: 'Tajawal-Regular',
    fontSize: 16,
  },
  text: {
    textAlign: 'left',
  },
  textBold: {
    fontFamily: 'Tajawal-Bold',
  },
  textLight: {
    fontFamily: 'Tajawal-Light',
    fontWeight: '300',
  },
  textSmall: {
    fontSize: 12,
  },
});

export default AppText;
