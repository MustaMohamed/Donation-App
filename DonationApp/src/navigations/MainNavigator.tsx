import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DonationFormScreen, ProjectDetailsScreen, RelatedProjectsScreen } from '../screens';
import { navigationConstants, translationConstants } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { DrawerToggle } from '../components';

export const MainNavigator = createStackNavigator({
    [navigationConstants.SCREEN_HOME]: {
      screen: BottomTabsNavigator,
      navigationOptions: ({ screenProps, navigation }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
        return {
          title: title,
          headerLeft: <DrawerToggle onTogglePress={navigation.toggleDrawer}/>,
          headerLeftContainerStyle: { padding: 10 },
        };
      },
    },
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
  });
