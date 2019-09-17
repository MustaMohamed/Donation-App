/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { I18nManager, LayoutAnimation, UIManager } from 'react-native';
import { IntlProvider } from 'react-intl';
import * as Localization from 'expo-localization';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { Languages } from './types';
import { AppNavigator } from './navigations';

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
  constructor(props) {
    super(props);
    this.state = {
      localLang: Languages.En,
      isRTL: false,
    };
    I18nManager.allowRTL(true);
  }


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

  render() {
    return (
      <IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={'en'}>
        <AppNavigator/>
      </IntlProvider>
    );
  }
}

export default Startup;
