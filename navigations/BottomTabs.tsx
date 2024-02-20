import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Settings from '../screens/user/Settings';
import Dashboard from '../screens/user/Dashboard';
import Courses from '../screens/user/Courses';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Dashboard' screenOptions={({route, navigation})=>({
      tabBarIcon: ({color, size, focused}) => {
        let iconName:'home' | 'home-outline'| 'settings' | 'ios-settings-sharp' | 'book' | 'book-outline' = 'home';              
        if(route.name === 'Dashbaord'){
          iconName = focused ? 'home' : 'home-outline';
        }
        if(route.name === 'Courses'){
          iconName = focused ? 'book' : 'book-outline';
        }
        if(route.name === 'Settings'){
          iconName = focused ? 'settings' : 'ios-settings-sharp';
        }

        return <Ionicons name={iconName} size={size} color={color} />
      }
    })}>
        <Tab.Screen name='Dashboard' component={Dashboard} />
        <Tab.Screen name='Courses' component={Courses} />
        <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs