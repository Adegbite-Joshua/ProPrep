import React, { useState } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from '../screens/Landing';
import CreateAccount from '../screens/CreateAccount';
import SignIn from '../screens/SignIn';
import BottomTabs from './BottomTabs';
import TestPage from '../screens/user/TestPage';
import ReviewTest from '../screens/user/ReviewTest';
import TakenTests from '../screens/user/TakenTests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createNativeStackNavigator();

const NativeStacks = () => {
  const [initialLandingPageRoute, setInitialLandingPageRoute] = useState('LandingPage')
  const initialLandingPage = async() => {
    try {
      if (await AsyncStorage.getItem('created_an_account')) {
        setInitialLandingPageRoute('SignIn')
      }
      if (await AsyncStorage.getItem('sign_in_before')) {
        setInitialLandingPageRoute('SignIn')
      }
    } catch (error) {
      console.error('Error storing the value', error);
    }
  }
  return (
    <Tab.Navigator initialRouteName='Landing' screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name='Landing' component={Landing} />
      <Tab.Screen name='CreateAccount' component={CreateAccount} />
      <Tab.Screen name='SignIn' component={SignIn} />
      <Tab.Screen name='Test' component={TestPage} />
      <Tab.Screen name='TakenTest' component={TakenTests} />
      <Tab.Screen name='ReviewTest' component={ReviewTest} />
      <Tab.Screen name='BottomTabs' component={BottomTabs} />
    </Tab.Navigator>
  )
}

export default NativeStacks