/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Startup from './Startup';
import { persistor, store } from './redux-store/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ar';


interface Props {

}

interface State {

}

class Application extends Component<Props, State> {


  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Startup/>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});

export default Application;
