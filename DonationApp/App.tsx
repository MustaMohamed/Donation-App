/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Application from './src/Application';
import { useScreens } from 'react-native-screens';

useScreens(true);
const App = () => {
  return (
    <Application/>
  );
};

const styles = StyleSheet.create({});

export default App;
