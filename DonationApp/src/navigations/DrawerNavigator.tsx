import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { navigationConstants } from '../constants';
import { MainNavigator } from './MainNavigator';
import { DrawerContent } from '../components';

export const DrawerNavigator = createDrawerNavigator({
    [navigationConstants.SCREEN_DRAWER_NAVIGATOR]: MainNavigator,
  },
  {
    initialRouteName: navigationConstants.SCREEN_DRAWER_NAVIGATOR,
    // drawerPosition: 'left',
    drawerType: 'slide',
    contentComponent: props => <DrawerContent {...props}/>,

  });