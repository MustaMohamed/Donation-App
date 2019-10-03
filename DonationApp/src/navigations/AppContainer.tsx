import React from 'react';
import { createAppContainer } from 'react-navigation';
import { injectIntl } from 'react-intl';
import { MainNavigator } from './MainNavigator';

export const AppNavigator = createAppContainer(MainNavigator);

export const LocalizedAppNavigator = injectIntl(props => <AppNavigator screenProps={props}/>);