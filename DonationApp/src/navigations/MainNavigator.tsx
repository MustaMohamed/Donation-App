import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DonationFormScreen, HomeScreen, ProjectDetailsScreen, RelatedProjectsScreen } from '../screens';
import { navigationConstants } from '../constants';

export const MainNavigator = createStackNavigator({
    [navigationConstants.SCREEN_HOME]: HomeScreen,
    [navigationConstants.SCREEN_RELATED_PROJECTS]: RelatedProjectsScreen,
    [navigationConstants.SCREEN_PROJECT_DETAILS]: ProjectDetailsScreen,
    [navigationConstants.SCREEN_DONATE_FORM]: DonationFormScreen,
  },
  {
    initialRouteName: navigationConstants.SCREEN_HOME,
    defaultNavigationOptions: {
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#ecf0f1',
      },
    },
  },
);
