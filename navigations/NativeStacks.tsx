// import React, { useState, useEffect } from 'react'
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Landing from '../screens/Landing';
// import CreateAccount from '../screens/CreateAccount';
// import SignIn from '../screens/SignIn';
// import BottomTabs from './BottomTabs';
// import TestPage from '../screens/user/TestPage';
// import ReviewTest from '../screens/user/ReviewTest';
// import TakenTests from '../screens/user/TakenTests';
// import UpdateProfile from '../screens/user/UpdateProfile';
// import TermsAndPolicies from '../screens/TermsAndPolicies';
// import ForgotPasswordFlowScreen from '../screens/ForgotPassword';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ContactUsScreen from '../screens/ContactUs';


// const Tab = createNativeStackNavigator();

// const NativeStacks = async() => {

//   // const [initialRoute, setInitialRoute] = useState<string>('BottomTabs');
//   const [initialRoute, setInitialRoute] = useState<string>('Landing');

//   // useEffect(() => {
//   //   const getInitialRoute = async () => {
//   //     try {
//   //       if (await AsyncStorage.getItem('@user')) {
//   //         setInitialRoute('BottomTabs');
//   //         console.log('BottomTabs')
//   //       } else if (await AsyncStorage.getItem('sign_in_before')) {
//   //         setInitialRoute('SignIn');
//   //         console.log('SignIn')
//   //       } else if (await AsyncStorage.getItem('created_an_account')) {
//   //         setInitialRoute('CreateAccount');
//   //         console.log('CreateAccount')
//   //       }
//   //     } catch (error) {
//   //       setInitialRoute('CreateAccount');
//   //     }
//   //   };

//   //   getInitialRoute();
//   // }, []);
//   return (
//     <Tab.Navigator 
//     // initialRouteName={await AsyncStorage.getItem('@user') ? 'BottomTabs' : await AsyncStorage.getItem('sign_in_before') ? 'SignIn' : await AsyncStorage.getItem('created_an_account') ? 'CreateAccount' : 'Landing' }
//     // initialRouteName='Landing' 
//     screenOptions={{
//       headerShown: false,
//       headerTitleAlign: 'center'
//     }}>   
//       <Tab.Screen name='Landing' component={Landing} />
//       <Tab.Screen name='CreateAccount' component={CreateAccount} />
//       <Tab.Screen name='SignIn' component={SignIn} />
//       <Tab.Screen name='Test' component={TestPage} />
//       <Tab.Screen name='Taken Test' component={TakenTests} />
//       <Tab.Screen name='Review Test' component={ReviewTest} />
//       <Tab.Screen name='Update Profile' component={UpdateProfile} />
//       <Tab.Screen name='Terms And Policies' component={TermsAndPolicies} />
//       <Tab.Screen name='Forgot Password' component={ForgotPasswordFlowScreen} />
//       <Tab.Screen name='Contact Us' component={ContactUsScreen} />
//       <Tab.Screen name='BottomTabs' component={BottomTabs} />
//     </Tab.Navigator>
//   )
// }

// export default NativeStacks;

import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import ContactUsScreen from '../screens/ContactUs';

const Tab = createNativeStackNavigator();

const NativeStacks = ({ navigation }) => {
  const [initialRoute, setInitialRoute] = useState('Landing');

  useEffect(() => {
    const getInitialRoute = async () => {
      try {
        if (await AsyncStorage.getItem('@user')) {
          setInitialRoute('BottomTabs');
        } else if (await AsyncStorage.getItem('sign_in_before')) {
          setInitialRoute('SignIn');
        } else if (await AsyncStorage.getItem('created_an_account')) {
          setInitialRoute('CreateAccount');
        }
      } catch (error) {
        console.error('Error getting initial route:', error);
        // Handle error as needed, and set a default initial route
        setInitialRoute('Landing');
      }
    };

    getInitialRoute();
  }, []);

  return (
    <Tab.Navigator 
      initialRouteName='Landing'
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center'
      }}
    >   
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
  );
};

export default NativeStacks;
