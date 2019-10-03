import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DonationFormScreen, ProjectDetailsScreen, RelatedProjectsScreen } from '../screens';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { Icon } from 'react-native-elements';

export const MainNavigator = createStackNavigator({
    [navigationConstants.SCREEN_HOME]: {
      screen: BottomTabsNavigator,
      navigationOptions: ({ screenProps, navigation }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
        return {
          title: title,
          headerLeft: <Icon name={'settings-outline'} type={'material-community'} size={28}/>,
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
      headerTintColor: colorConstants.PRIMARY_BLACK,
      headerStyle: {
        backgroundColor: colorConstants.PRIMARY_WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colorConstants.PRIMARY_BLACK,
      },
    },
  });
