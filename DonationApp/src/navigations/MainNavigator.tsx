import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { HomeScreen } from '../screens';
import { injectIntl } from 'react-intl';

export const MainNavigator = createStackNavigator({
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  },
);
export const AppNavigator = createAppContainer(MainNavigator);

export const LocalizedAppNavigator = injectIntl(props => <AppNavigator screenProps={props} />)