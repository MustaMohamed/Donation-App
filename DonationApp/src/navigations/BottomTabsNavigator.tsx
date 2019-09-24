import { createBottomTabNavigator } from 'react-navigation-tabs';
import { navigationConstants } from '../constants';
import { DonationProjectsScreen, DoneProjectsScreen, ExecutionProjectsScreen } from '../screens';

export const BottomTabsNavigator = createBottomTabNavigator({
  [navigationConstants.SCREEN_DONATION_PROJECTS]: DonationProjectsScreen,
  [navigationConstants.SCREEN_EXECUTION_PROJECTS]: ExecutionProjectsScreen,
  [navigationConstants.SCREEN_DONE_PROJECTS]: DoneProjectsScreen,
}, {
  initialRouteName: navigationConstants.SCREEN_DONATION_PROJECTS,
  order: [navigationConstants.SCREEN_DONATION_PROJECTS, navigationConstants.SCREEN_EXECUTION_PROJECTS, navigationConstants.SCREEN_DONE_PROJECTS],
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
      justifyContent: 'space-around',
    },
  },
});