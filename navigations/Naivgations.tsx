import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import React from 'react'
import DrawerTab from './DrawerTab'


const Navigations = () => {
  const currentScheme = useColorScheme();
  return (
    <NavigationContainer theme={currentScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style='auto' />
        <DrawerTab/>
    </NavigationContainer>
  )
}

export default Navigations