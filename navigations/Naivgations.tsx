import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useColorScheme } from 'react-native'
import NativeStacks from './NativeStacks'


const Navigations = () => {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
    // s theme={currentTheme == 'dark' ? DarkTheme : DefaultTheme}
     >
        <StatusBar style='auto' />
        <NativeStacks/>
    </NavigationContainer>
  )
}

export default Navigations