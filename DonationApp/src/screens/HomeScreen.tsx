/**
 * created by musta at 9/17/2019
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { injectIntl, IntlShape } from 'react-intl';
import { navigationConstants, translationConstants } from '../constants';
import { AppState, Project } from '../types';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux-store/store';
import { changeCurrentLanguageAction } from '../redux-store/actions';
import { DrawerToggle, ProjectsList } from '../components';
import { projects } from '../utils';
import { NavigationParams, NavigationState } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { BottomTabsNavigator } from '../navigations';

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


  render() {
    return (
      <View style={[styles.startupContainer]}>
        <BottomTabsNavigator/>
        {/*<ProjectsList onItemPress={this.onProjectItemPress} projects={projects}/>*/}
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

});