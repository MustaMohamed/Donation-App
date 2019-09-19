/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { I18nManager, LayoutAnimation, StatusBar, UIManager } from 'react-native';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { AppState, Languages } from './types';
import { connect } from 'react-redux';
import { ApplicationState, persistor } from './redux-store/store';
import { IntlProvider } from 'react-intl';
import ReactNativeRestart from 'react-native-restart';
import { LocalizedAppNavigator } from './navigations';
import { Button, ThemeProvider } from 'react-native-elements';

const langs = {
  [Languages.En]: lang_en,
  [Languages.Ar]: lang_ar,
};

interface Props {
  app: AppState;
}

interface State {
  localLang: string;
  isRTL: boolean;
}

class Startup extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      localLang: this.props.app.language.currentLanguage,
      isRTL: this.props.app.language.isRTL,
    };
  }

  async componentDidMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true);
    if (!this.props.app.language)
      this.detectLocalLanguage();
    if (I18nManager.isRTL !== this.state.isRTL) {
      I18nManager.forceRTL(this.state.isRTL);
      I18nManager.isRTL = this.state.isRTL;
      await persistor.flush();
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    LayoutAnimation.spring();
    this.detectLocalLanguage();
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    return this.props.app.language.currentLanguage !== nextProps.app.language.currentLanguage;
  }

  detectLocalLanguage = () => {
    let language: string = Languages.En, isRTL: boolean = false;
    if (!this.props.app.language) {
      // isRTL = !(Localization.locale.startsWith(Languages.En) || !Localization.locale.startsWith(Languages.Ar));
      language = Languages.En;
    } else {
      language = this.props.app.language.currentLanguage;
      isRTL = this.props.app.language.isRTL;
    }
    if (this.props.app.language.currentLanguage !== this.state.localLang)
      this.updateLanguage(language, isRTL);
  };

  updateLanguage = (language: string, isRTL: boolean) => {
    this.setState(prevState => {
      return { localLang: language, isRTL: isRTL };
    }, async () => {
      I18nManager.forceRTL(this.state.isRTL);
      I18nManager.isRTL = this.state.isRTL;
      await persistor.flush();
      ReactNativeRestart.Restart();
    });
  };

  render() {
    return (
      <IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={'en'}>
        <StatusBar backgroundColor={'#95a5a6'} barStyle='light-content' />
        <ThemeProvider>
          <LocalizedAppNavigator/>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};
export default connect(mapStateToProps)(Startup);
