/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { Button, LayoutAnimation, StyleSheet, Text, UIManager, View } from 'react-native';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { translationConstants } from './constants';
import * as Localization from 'expo-localization';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { Languages } from './types';

const langs = {
  [Languages.En]: lang_en,
  [Languages.Ar]: lang_ar,
};

interface Props {
}

interface State {
  localLang: string;
  isRTL: boolean;
}

class Startup extends Component<Props, State> {
  state = {
    localLang: Languages.En,
    isRTL: false,
  };

  componentDidMount(): void {
    if (UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
    this.detectLocalLanguage();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    LayoutAnimation.spring();
  }

  detectLocalLanguage = () => {
    const isEnglish = Localization.locale.startsWith(Languages.En) || !Localization.locale.startsWith(Languages.Ar);
    if (isEnglish && this.state.localLang != Languages.En)
      this.setState({ localLang: isEnglish ? Languages.En : Languages.Ar, isRTL: !isEnglish });
  };

  toggleLanguage = () => {
    this.setState(prevState => ({
      isRTL: !prevState.isRTL,
      localLang: prevState.localLang === Languages.En ? Languages.Ar : Languages.En,
    }));
  };


  render() {
    return (
      <IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={'en'}>
        <View style={[styles.startupContainer, this.state.isRTL && styles.rtlView]}>
          <Text style={[styles.text, this.state.isRTL && styles.rtlText]}>
            <FormattedMessage id={translationConstants.HELLO}/>
          </Text>
          <Button title={'change language'} onPress={this.toggleLanguage}/>
        </View>
      </IntlProvider>
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
    textAlign: 'right', writingDirection: 'rtl',
  },
  rtlView: {
    // flexDirection: 'row-reverse',
  },
});

export default Startup;
