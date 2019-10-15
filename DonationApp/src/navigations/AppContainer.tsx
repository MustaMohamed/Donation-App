import React from 'react';
import { createAppContainer } from 'react-navigation';
import { injectIntl } from 'react-intl';
import { MainNavigator } from './MainNavigator';
import { DrawerNavigator } from './DrawerNavigator';

export const AppNavigator = createAppContainer(DrawerNavigator);

export const LocalizedAppNavigator = injectIntl(props => <AppNavigator screenProps={props}/>);