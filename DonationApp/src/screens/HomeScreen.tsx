/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { AppState, Languages, Project } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import { DrawerToggle, ProjectsList } from '../components';
import { projects } from '../utils';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp<NavigationState, NavigationParams>;
  changeAppCurrentLanguage: typeof changeCurrentLanguageAction;
  app: AppState;
  intl: IntlShape;
}

interface State {

}


class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ screenProps, navigation }) => {
    const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
    return {
      title: title,
      headerRight: <DrawerToggle onTogglePress={navigation.toggleDrawer}/>,
      headerRightContainerStyle: { marginHorizontal: 10 },
    };
  };

  toggleLanguage = () => {
    const nextLanguage = this.props.app.language.currentLanguage === Languages.En ? Languages.Ar : Languages.En;
    this.props.changeAppCurrentLanguage(nextLanguage);
  };

  onProjectItemPress = (item: Project) => {
    this.props.navigation.navigate(navigationConstants.SCREEN_PROJECT_DETAILS, {
      [navigationConstants.SCREEN_PARAM_PROJECT]: item,
    });
  };

  _toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={[styles.startupContainer]}>
        <Text style={[styles.text]}>
          <FormattedMessage id={translationConstants.HELLO}/>
        </Text>
        <Button title={'change language'} onPress={this.toggleLanguage}/>
        <ProjectsList onItemPress={this.onProjectItemPress} projects={projects}/>
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
})(injectIntl(HomeScreen));


const styles = StyleSheet.create({
  startupContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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