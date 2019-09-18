/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { translationConstants } from '../constants';
import { AppState, Languages } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';

interface Props {
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState
}

interface State {

}

class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = () => {
    return {
      title: 'Home',
    };
  };

  toggleLanguage = () => {
    const nextLanguage = this.props.app.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  render() {
    return (
      <View style={[styles.startupContainer]}>
        <Text style={[styles.text]}>
          {/* <FormattedMessage id={translationConstants.HELLO}/>
       */}Hello from app
        </Text>
        <Button title={'change language'} onPress={this.toggleLanguage}/>
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps, {
  changeAppCurrentLanguage: changeCurrentLanguageAction,
})(HomeScreen);

const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlView: {
    // flexDirection: 'row-reverse',
  },
});