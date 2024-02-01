import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../screens/Settings';
import Dashboard from '../screens/user/Dashboard';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Dashboard' component={Dashboard} />
        <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs