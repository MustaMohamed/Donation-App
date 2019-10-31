import React, { Component } from 'react';
import Startup from './Startup';
import { Provider } from 'react-redux';
import { persistor, store } from './redux-store/store';
import { PersistGate } from 'redux-persist/integration/react';

class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Startup/>
        </PersistGate>
      </Provider>
    );
  }
}

export default Application;