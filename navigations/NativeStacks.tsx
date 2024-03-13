import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from '../screens/Landing';
import CreateAccount from '../screens/CreateAccount';
import SignIn from '../screens/SignIn';
import BottomTabs from './BottomTabs';
import TestPage from '../screens/user/TestPage';
import ReviewTest from '../screens/user/ReviewTest';
import TakenTests from '../screens/user/TakenTests';
import UpdateProfile from '../screens/user/UpdateProfile';
import TermsAndPolicies from '../screens/TermsAndPolicies';
import ForgotPasswordFlowScreen from '../screens/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactUsScreen from '../screens/ContactUs';


const Tab = createNativeStackNavigator();

const NativeStacks = () => {

  // const [initialRoute, setInitialRoute] = useState<string>('BottomTabs');
  const [initialRoute, setInitialRoute] = useState<string>('');
  const [readyToRender, setReadyToRender] = useState<boolean>(false);

  useEffect(() => {
    const getInitialRoute = async () => {
      try {
        if (await AsyncStorage.getItem('@user')) {
          setInitialRoute('BottomTabs');          
        } else if (await AsyncStorage.getItem('sign_in_before')) {
          setInitialRoute('SignIn');          
        } else if (await AsyncStorage.getItem('created_an_account')) {
          setInitialRoute('CreateAccount');          
        } else {
          setInitialRoute('Landing');
        }
      } catch (error) {
        setInitialRoute('Landing');
      } finally {
        setReadyToRender(true)
      }
    };

    const fetchData = async () => {
      await getInitialRoute();
    };
    fetchData();
  }, []);  

  if(!readyToRender) {
    return <View></View>
  }

  return (
    <Tab.Navigator initialRouteName={initialRoute} screenOptions={{
      headerShown: false,
      headerTitleAlign: 'center'
    }}>
      <Tab.Screen name='Landing' component={Landing} />
      <Tab.Screen name='CreateAccount' component={CreateAccount} />
      <Tab.Screen name='SignIn' component={SignIn} />
      <Tab.Screen name='Test' component={TestPage} />
      <Tab.Screen name='Taken Test' component={TakenTests} />
      <Tab.Screen name='Review Test' component={ReviewTest} />
      <Tab.Screen name='Update Profile' component={UpdateProfile} />
      <Tab.Screen name='Terms And Policies' component={TermsAndPolicies} />
      <Tab.Screen name='Forgot Password' component={ForgotPasswordFlowScreen} />
      <Tab.Screen name='Contact Us' component={ContactUsScreen} />
      <Tab.Screen name='BottomTabs' component={BottomTabs} />
    </Tab.Navigator>
  )
}

export default NativeStacks