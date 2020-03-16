import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Home/index.js';
import FavoriteScreen from '../Favorite/index.js';
import Colors from '~/styles/colors';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Colors.gray}
      inactiveColor={Colors.inative}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: Colors.purple,
          tabBarIcon: ({color}) => (
            <Ionicons name={'ios-home'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoriteScreen}
        options={{
          tabBarColor: Colors.pink,
          tabBarIcon: ({color}) => (
            <Ionicons name={'ios-heart'} color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
