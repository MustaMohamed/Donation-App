/**
 * created by musta at 10/3/2019
 */

import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorConstants, translationConstants } from '../constants';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'react-native-elements';
import { AppState, Languages } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';

interface Props {
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
}

class SettingsScreen extends PureComponent<Props> {
  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_SETTINGS_TITLE });
    return {
      title: title,
    };
  };

  onChangeAppLanguage = () => {
    const nextLanguage = this.props.app.language.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={this.onChangeAppLanguage} style={[styles.item, styles.itemRTL]}>
            <Icon containerStyle={{ marginBottom: 10 }} name={'language'} type={'material'} size={22}/>
            <Text style={styles.label}><FormattedMessage id={translationConstants.APP_LANGUAGE}/></Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: colorConstants.PRIMARY_WHITE,
    alignItems: 'flex-start',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: colorConstants.PRIMARY_BLACK,
    borderBottomWidth: 1,
  },
  itemRTL: {
    flexDirection: 'row',
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    color: colorConstants.PRIMARY_BLACK,
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
})(SettingsScreen);
