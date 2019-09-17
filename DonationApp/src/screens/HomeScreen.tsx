/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { Button, I18nManager, StyleSheet, Text, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { translationConstants } from '../constants';
import { Languages } from '../types';

interface Props {
}

interface State {
  localLang: string;
  isRTL: boolean;
}

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      localLang: Languages.En,
      isRTL: false,
    };
  }

  static navigationOptions = () => {
    return {
      title: 'Home',
    };
  };

  toggleLanguage = () => {
    this.setState(prevState => ({
      isRTL: !prevState.isRTL,
      localLang: prevState.localLang === Languages.En ? Languages.Ar : Languages.En,
    }), async () => {
      I18nManager.forceRTL(!this.state.isRTL);
      // await Updates.reload();
    });
  };

  render() {
    return (
      <View style={[styles.startupContainer, this.state.isRTL && styles.rtlView]}>
        <Text style={[styles.text]}>
          <FormattedMessage id={translationConstants.HELLO}/>
        </Text>
        <Button title={'change language'} onPress={this.toggleLanguage}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlView: {
    // flexDirection: 'row-reverse',
  },
});

export default HomeScreen;
