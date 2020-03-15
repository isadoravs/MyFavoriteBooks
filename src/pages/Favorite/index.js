import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../Details/index';
import FavoriteScreen from './favorite';

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
        options={{title: 'Detalhes'}}
      />
    </Stack.Navigator>
  );
}
