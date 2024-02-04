import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../screens/Settings';
import Dashboard from '../screens/user/Dashboard';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={({route, navigation})=>({
      tabBarIcon: ({color, size, focused}) => {
        let iconName:string = 'home';              
        if(route.name == 'Dashbaord'){
          iconName = focused ? 'home' : 'home-outline';
        }
        if(route.name == 'Settings'){
          iconName = focused ? 'settings' : 'ios-settings-sharp';
        }

        return <Ionicons name={iconName as string} size={size} color={color} />
      }
    })}>
        <Tab.Screen name='Dashboard' component={Dashboard} />
        <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs