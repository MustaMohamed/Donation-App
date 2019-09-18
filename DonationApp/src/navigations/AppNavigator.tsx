import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { HomeScreen } from '../screens';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
});


export default createAppContainer(AppNavigator);