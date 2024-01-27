import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from '../screens/Landing';
import CreateAccount from '../screens/CreateAccount';
import SignIn from '../screens/SignIn';
import BottomTabs from './BottomTabs';

const Tab = createNativeStackNavigator();

const NativeStacks = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
        <Tab.Screen name='Landing' component={Landing} />
        <Tab.Screen name='CreateAccount' component={CreateAccount} />
        <Tab.Screen name='SignIn' component={SignIn} />
        <Tab.Screen name='BottomTabs' component={BottomTabs} />
    </Tab.Navigator>
  )
}

export default NativeStacks