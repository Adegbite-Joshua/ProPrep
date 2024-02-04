import { NavigationContainer } from '@react-navigation/native'
// import { StatusBar } from 'expo-status-bar'
import React from 'react'
import NativeStacks from './NativeStacks'


const Navigations = () => {
  return (
    <NavigationContainer>
        {/* <StatusBar style='auto' /> */}
        <NativeStacks/>
    </NavigationContainer>
  )
}

export default Navigations