import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from '../screens/Landing';
import CreateAccount from '../screens/CreateAccount';
import SignIn from '../screens/SignIn';
import BottomTabs from './BottomTabs';
import TestPage from '../screens/user/TestPage';
import ReviewTest from '../screens/user/ReviewTest';
import TakenTests from '../screens/user/TakenTests';
import UpdateProfile from '../screens/user/UpdateProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createNativeStackNavigator();

const NativeStacks = () => {

  const [initialRoute, setInitialRoute] = useState<string>('BottomTabs');

  useEffect(() => {
    const getInitialRoute = async () => {
      try {
        if (await AsyncStorage.getItem('@user')) {
          setInitialRoute('BottomTabs');
          console.log('BottomTabs')
        } else if (await AsyncStorage.getItem('sign_in_before')) {
          setInitialRoute('SignIn');
          console.log('SignIn')
        } else if (await AsyncStorage.getItem('created_an_account')) {
          setInitialRoute('CreateAccount');
          console.log('CreateAccount')
        }
      } catch (error) {
        console.error('Error storing the value', error);
        setInitialRoute('CreateAccount');
      }
    };

    getInitialRoute();
  }, []);
  return (
    <Tab.Navigator initialRouteName={initialRoute} screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name='Landing' component={Landing} />
      <Tab.Screen name='CreateAccount' component={CreateAccount} />
      <Tab.Screen name='SignIn' component={SignIn} />
      <Tab.Screen name='Test' component={TestPage} />
      <Tab.Screen name='TakenTest' component={TakenTests} />
      <Tab.Screen name='ReviewTest' component={ReviewTest} />
      <Tab.Screen name='UpdateProfile' component={UpdateProfile} />
      <Tab.Screen name='BottomTabs' component={BottomTabs} />
    </Tab.Navigator>
  )
}

export default NativeStacks