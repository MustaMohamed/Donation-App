import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { HomeScreen, RelatedProjectsScreen } from '../screens';
import { injectIntl } from 'react-intl';

export const MainNavigator = createStackNavigator({
    Home: HomeScreen,
    RelatedProjects: RelatedProjectsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#ecf0f1',
      },
    },
  },
);
export const AppNavigator = createAppContainer(MainNavigator);

export const LocalizedAppNavigator = injectIntl(props => <AppNavigator screenProps={props}/>);