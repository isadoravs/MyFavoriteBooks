import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Home/index.js';
import FavoriteScreen from '../Favorite/index.js';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffffff"
      inactiveColor="#BBBBBB"
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: '#8C46FF',
          tabBarIcon: ({color}) => (
            <Ionicons name={'ios-home'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoriteScreen}
        options={{
          tabBarColor: '#FF4692',
          tabBarIcon: ({color}) => (
            <Ionicons name={'ios-heart'} color={color} size={26} />
          ),
          activeColor: '#ffffff',
          inactiveColor: '#92c5c2',
          barStyle: {backgroundColor: '#2c6d6a'},
          showIcon: true,
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
