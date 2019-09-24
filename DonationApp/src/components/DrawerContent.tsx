/**
 * created by musta at 9/24/2019
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { ApplicationState } from '../redux-store/store';
import { connect } from 'react-redux';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { AppState } from '../types/redux-store';
import { Languages } from '../types';
import { translationConstants } from '../constants';

interface Props {
  intl: IntlShape;
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
}

class DrawerContent extends Component<Props> {

  onChangeAppLanguage = () => {
    const nextLanguage = this.props.app.language.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={this.onChangeAppLanguage} style={styles.item}>
          <Icon containerStyle={{ marginBottom: 10 }} name={'language'} type={'material'} size={22}/>
          <Text style={styles.label}><FormattedMessage id={translationConstants.APP_LANGUAGE}/></Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {},
});
const mapStateToProps = (state: ApplicationState) => {
  const { app } = state;
  return { app };
};

export default connect(mapStateToProps, {
  changeAppCurrentLanguage: changeCurrentLanguageAction,
})(injectIntl(DrawerContent));
