import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../pages/Details';
import FavoriteScreen from '../pages/Favorite';

const Stack = createStackNavigator();

export default function HomeIndex() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: '', headerTransparent: 'true'}}
      />
    </Stack.Navigator>
  );
}
