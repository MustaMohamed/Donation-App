/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { I18nManager, LayoutAnimation, UIManager } from 'react-native';
import { IntlProvider } from 'react-intl';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { AppState, Languages } from './types';
import { connect } from 'react-redux';
import { ApplicationState } from './redux-store/store';
import ReactNativeRestart from 'react-native-restart';
import { HomeScreen } from './screens';

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
    if (this.props.app.currentLanguage !== prevProps.app.currentLanguage) {
      this.detectLocalLanguage();
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    return this.state.localLang !== nextState.localLang || this.props.app.currentLanguage !== nextProps.app.currentLanguage;
  }

  detectLocalLanguage = () => {
    let isRTL = false;
    if (!this.props.app.currentLanguage) {
      // isRTL = !(Localization.locale.startsWith(Languages.En) || !Localization.locale.startsWith(Languages.Ar));
    } else {
      isRTL = !(this.props.app.currentLanguage.startsWith(Languages.En) || !this.props.app.currentLanguage.startsWith(Languages.Ar));
    }
    this.updateLanguage(isRTL);
    // ReactNativeRestart.Restart();
  };

  updateLanguage = (isRTL) => {
    this.setState({ localLang: isRTL ? Languages.Ar : Languages.En, isRTL: isRTL }, () => {
      I18nManager.forceRTL(this.state.isRTL);
    });
  };

  render() {
    return (
        <HomeScreen/>
      // {/*<IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={'en'}>*/}</IntlProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};
export default connect(mapStateToProps)(Startup);
