/**
 * created by musta at 9/16/2019
 */

import React, { PureComponent } from 'react';
import { I18nManager, LayoutAnimation, StatusBar, UIManager } from 'react-native';

import { AppState, Languages } from './types';
import { connect } from 'react-redux';
import { ApplicationState, persistor } from './redux-store/store';
import { IntlProvider } from 'react-intl';
import ReactNativeRestart from 'react-native-restart';
import { LocalizedAppNavigator } from './navigations';
import { ThemeProvider } from 'react-native-elements';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Loader from 'react-native-modal-loader';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ar';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { colorConstants } from './constants';
import numeral from 'numeral';

const langs = {
  [Languages.En]: lang_en,
  [Languages.Ar]: lang_ar,
};


// load a locale
numeral.register('locale', Languages.Ar, {
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'الف',
    million: 'مليون',
    billion: 'مليار',
    trillion: 'ترليون',
  },
  currency: {
    symbol: '$',
  },
});


/*
* Paper them config
* */

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Tajawal-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Tajawal-Medium',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'Tajawal-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Tajawal-ExtraLight',
      fontWeight: 'normal',
    },
  },
};

const paperTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

/******************/
interface Props {
  app: AppState;
}

interface State {
  localLang: string;
  isRTL: boolean;
  isLoading: boolean;
}

class Startup extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      localLang: this.props.app.language.currentLanguage,
      isRTL: this.props.app.language.isRTL,
      isLoading: this.props.app.uiLoaderIsActive,
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
    if (this.state.isLoading !== this.props.app.uiLoaderIsActive)
      this.setState({ isLoading: this.props.app.uiLoaderIsActive });
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

    // switch between locales
    numeral.locale(language);
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
        <PaperProvider theme={paperTheme}>
          <StatusBar backgroundColor={colorConstants.PRIMARY_GRAY} barStyle='light-content'/>
          <Loader loading={this.state.isLoading} size={'large'} color={colorConstants.SECONDARY_RED}/>
          <ThemeProvider>
            <LocalizedAppNavigator/>
          </ThemeProvider>
        </PaperProvider>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};
export default connect(mapStateToProps)(Startup);
