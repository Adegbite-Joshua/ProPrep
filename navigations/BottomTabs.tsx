import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Landing from '../screens/Landing';
import Settings from '../screens/Settings';
import NativeStacks from './NativeStacks';
import SignIn from '../screens/SignIn';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={SignIn} />
        <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs