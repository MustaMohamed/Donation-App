import { colorConstants, navigationConstants, translationConstants } from '../constants';
import { DonationProjectsScreen, DoneProjectsScreen, ExecutionProjectsScreen } from '../screens';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { IntlShape } from 'react-intl';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationParams, NavigationState } from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { Icon } from 'react-native-elements';


export const BottomTabsNavigator = createMaterialBottomTabNavigator({
    [navigationConstants.SCREEN_DONATION_PROJECTS]: {
      screen: DonationProjectsScreen,
      navigationOptions: ({ screenProps, navigation }: { screenProps: { intl: IntlShape }, navigation: NavigationStackProp<NavigationState, NavigationParams> }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONATION_PROJECTS_TAB_TITLE });
        return {
          title: title,
          tabBarIcon: ({ focused, tintColor }) => {
            return <FontAwesome5Icon name={'donate'} size={22} color={tintColor}/>;
          },
        };
      },
    },
    [navigationConstants.SCREEN_EXECUTION_PROJECTS]: {
      screen: ExecutionProjectsScreen,
      navigationOptions: ({ screenProps, navigation }: { screenProps: { intl: IntlShape }, navigation: NavigationStackProp<NavigationState, NavigationParams> }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_EXECUTION_PROJECTS_TAB_TITLE });
        return {
          title: title,
          tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name={'progress-wrench'} type={'material-community'} color={tintColor}/>;
          },
        };
      },
    },
    [navigationConstants.SCREEN_DONE_PROJECTS]: {
      screen: DoneProjectsScreen,
      navigationOptions: ({ screenProps, navigation }: { screenProps: { intl: IntlShape }, navigation: NavigationStackProp<NavigationState, NavigationParams> }) => {
        const title = screenProps.intl.formatMessage({ id: translationConstants.SCREEN_DONE_PROJECTS_TAB_TITLE });
        return {
          title: title,
          tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name={'progress-check'} type={'material-community'} color={tintColor}/>;
          },
        };
      },
    },
  },
  {
    initialRouteName: navigationConstants.SCREEN_DONATION_PROJECTS,
    order: [navigationConstants.SCREEN_DONATION_PROJECTS, navigationConstants.SCREEN_EXECUTION_PROJECTS, navigationConstants.SCREEN_DONE_PROJECTS],
    shifting: true,
    activeColor: colorConstants.PRIMARY_BLACK,
    inactiveColor: colorConstants.PRIMARY_GRAY,
    barStyle: {
      backgroundColor: colorConstants.PRIMARY_WHITE,
      borderTopWidth: 2,
      borderTopColor: 'rgba(0,0,0,0.2)',
    },
  },
);