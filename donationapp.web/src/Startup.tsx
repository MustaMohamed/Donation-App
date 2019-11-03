import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { AppState, LanguageDirection, Languages } from './types';
import { CompletedPage, DonationPage, ExecutionPage, HomePage } from './pages';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';
import { Helmet } from 'react-helmet';
import { ApplicationState, persistor } from './redux-store/store';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TopNavbar } from './components';
import { Loader, Modal } from 'semantic-ui-react';

const langs: { [key: string]: any } = {
  [Languages.En]: lang_en,
  [Languages.Ar]: lang_ar,
};


interface Props {
  app: AppState;
}

interface State {
  localLang: string;
  isRTL: boolean;
  isLoading: boolean;
}

class Startup extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      localLang: this.props.app.language.currentLanguage,
      isRTL: this.props.app.language.isRTL,
      isLoading: this.props.app.uiLoaderIsActive,
    };
  }

  componentWillMount() {
    if (this.state.localLang === Languages.En) {
      require('./styles/semantic/dist/semantic.min.css');
      require('./styles/bootstrap-utils.min.css');
    } else {
      require('./styles/semantic/dist/semantic.rtl.min.css');
      require('./styles/bootstrap-utils.rtl.min.css');
    }
  }

  async componentDidMount() {
    if (!this.state.localLang)
      this.detectLocalLanguage();
  }

  componentDidUpdate(prevProps: Readonly<Props | any>, prevState: Readonly<State>, snapshot?: any): void {
    this.detectLocalLanguage();
    if (this.state.isLoading !== this.props.app.uiLoaderIsActive)
      this.setState({ isLoading: this.props.app.uiLoaderIsActive });
  }

  detectLocalLanguage = () => {
    let language: string = Languages.En, isRTL: boolean = false;
    if (!this.props.app.language) {
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
      await persistor.flush();
      window.location.reload();
    });
  };

  render() {
    return (
      <IntlProvider messages={langs[this.state.localLang]} locale={this.state.localLang} defaultLocale={Languages.En}>
        <Helmet htmlAttributes={{ lang: this.state.localLang, dir: this.state.isRTL ? LanguageDirection.Rtl : LanguageDirection.Ltr }}/>

        <Router>
          <TopNavbar/>
          <Modal open={this.props.app.uiLoaderIsActive} basic>
            <Loader active={this.props.app.uiLoaderIsActive}>Loading</Loader>
          </Modal>
          <Switch>
            <Route exact path={['/', '/home']}>
              <HomePage/>
            </Route>
            <Route path={'/donation'}>
              <DonationPage/>
            </Route>
            <Route path={'/execution'}>
              <ExecutionPage/>
            </Route>
            <Route path={'/completed'}>
              <CompletedPage/>
            </Route>
            <Route path="*">
              <div><h1>Not found</h1></div>
            </Route>
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return {
    app,
  };
};

export default connect(mapStateToProps)(Startup);