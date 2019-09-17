/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Startup from './Startup';
import { persistor, store } from './redux-store/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ar';
import { IntlProvider } from 'react-intl';
import lang_en from './assets/langs/en.json';
import lang_ar from './assets/langs/ar.json';


const langs = {
  en: lang_en,
  ar: lang_ar,
};

class Application extends Component {
  componentDidMount(): void {
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider messages={langs['ar']} locale={'en'} defaultLocale={'en'}>
            <Startup/>
          </IntlProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default Application;
