import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DonationFormScreen, ProjectDetailsScreen, RelatedProjectsScreen, SettingsScreen } from '../screens';
import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';
import { AppText, DrawerToggle } from '../components';

export const MainNavigator = createStackNavigator({
    [navigationConstants.SCREEN_HOME]: {
      screen: BottomTabsNavigator,
      navigationOptions: ({ screenProps, navigation }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.APP_TITLE, defaultMessage: 'Home' });
        return {
          title: title,
          headerTitle: <AppText style={{ fontSize: 18 }} bold text={title}/>,
          titleStyle: {
            fontFamily: 'Tajawal-Bold',
          },
          headerLeft: <DrawerToggle onTogglePress={() => navigation.openDrawer()}/>,
          headerLeftContainerStyle: { padding: 10 },
        };
      },
    },
    [navigationConstants.SCREEN_RELATED_PROJECTS]: RelatedProjectsScreen,
    [navigationConstants.SCREEN_PROJECT_DETAILS]: ProjectDetailsScreen,
    [navigationConstants.SCREEN_DONATE_FORM]: DonationFormScreen,
    [navigationConstants.SCREEN_SETTINGS]: SettingsScreen,
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
        textTransform: 'capitalize',
        color: colorConstants.PRIMARY_BLACK,
      },
    },
    headerLayoutPreset: 'center',
  });
