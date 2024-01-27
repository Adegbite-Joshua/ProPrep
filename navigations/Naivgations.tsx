import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import BottomTabs from './BottomTabs'
import NativeStacks from './NativeStacks'


const Navigations = () => {
  return (
    <NavigationContainer>
        <NativeStacks/>
    </NavigationContainer>
  )
}

export default Navigations