/**
 * created by musta at 9/16/2019
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Startup from './Startup';
import { persistor, store } from './redux-store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nManager } from 'react-native';


interface Props {
}

interface State {
}

class Application extends Component<Props, State> {
  constructor(props){
    super(props);
    I18nManager.allowRTL(true);
  }
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

export default Application;