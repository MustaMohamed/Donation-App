import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { Languages } from './types';
import { HomePage } from './pages';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { Helmet } from 'react-helmet';

const langs: { [key: string]: any } = {
  [Languages.En]: lang_en,
  [Languages.Ar]: lang_ar,
};


interface Props {
  app: any;
}

interface State {
  localLang: string;
  isRTL: boolean;
  isLoading: boolean;
}


class Startup extends Component<Props | any, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // localLang: this.props.app.language.currentLanguage,
      // isRTL: this.props.app.language.isRTL,
      // isLoading: this.props.app.uiLoaderIsActive,
      localLang: Languages.Ar,
      isRTL: true,
      isLoading: false,
    };
  }

  componentWillMount() {
    if (this.state.localLang === Languages.En) {
      require('./styles/semantic-ui/semantic.min.css');
    } else {
      require('./styles/semantic-ui/semantic.rtl.min.css');
    }
  }

  async componentDidMount() {
    if (!this.state.localLang)
      this.detectLocalLanguage();
  }

  detectLocalLanguage = () => {
    let language: string = Languages.En, isRTL: boolean = false;
    // if (!this.props.app.language) {
    //   language = Languages.En;
    // } else {
    //   language = this.props.app.language.currentLanguage;
    //   isRTL = this.props.app.language.isRTL;
    // }
    // if (this.props.app.language.currentLanguage !== this.state.localLang)
    //   this.updateLanguage(language, isRTL);

  };

  updateLanguage = (language: string, isRTL: boolean) => {
    this.setState(prevState => {
      return { localLang: language, isRTL: isRTL };
    }, async () => {
      // await persistor.flush();
    });
  };

  render() {
    return (
      <IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={Languages.En}>
        <Helmet htmlAttributes={{ lang: this.state.localLang, dir: this.state.isRTL ? 'rtl' : 'ltr' }}/>

        <HomePage/>
      </IntlProvider>
    );
  }
}

export default Startup;