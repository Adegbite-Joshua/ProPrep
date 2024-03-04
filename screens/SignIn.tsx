// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Input from '../components/Forms/Input';
import LevelSelection from '../components/Forms/LevelSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../components/Loader';
import { serverUrl } from '../constants/constants';
import Toast from 'react-native-toast-message';
import getNetworkInfo from '../customHooks/getNetworkInfo';


interface errorsProps {
  email?: string | null,
  password?: string | null,
  level?: string | null,
}

// SignIn component
const SignIn = ({ navigation }) => {
  const [isConnected] = getNetworkInfo();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    level: '',
  });

  const [errors, setErrors] = useState<errorsProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: string, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: value }))
  }

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  const handleSignIn = async () => {
    console.log('Form data submitted:', formData);
    Keyboard.dismiss();    
    if (!isConnected) {
      Toast.show({
        type: 'Error',
        text1: 'Network error',
        text2: 'Check your internet connection and try again'
      })
      return;
    }
//     navigation.navigate('BottomTabs', { screen: 'Dashboard' });
// return;
    let validDetails = true;
    // setTimeout(() => , 2000)
    if (!formData.email) {
      handleError('Input your email', 'email')
      validDetails = false;
    } else if (!formData.email.match(/\S+@\S+\.\S+/)) {
      handleError('Enter valid email', 'email')
      validDetails = false;
    }
    if (!formData.password) {
      handleError('Input your password', 'password')
      validDetails = false;
    }

    if (validDetails) {
      try {
        setLoading(true);
        await AsyncStorage.setItem('sign_in_before', JSON.stringify({ value: true }));
        const sendSignUp:any = await axios.post(`${serverUrl}/api/testing_route/user/sign_in`, formData)
        if (sendSignUp.status == 200) {
          setLoading(false);
          await AsyncStorage.setItem('@user', JSON.stringify(sendSignUp.data.details));
          navigation.navigate('BottomTabs', { screen: 'Dashboard' });
          Toast.show({
            type: 'success',
            text1: 'Successful',
            text2: 'Sign in successful'
          })
        }
      } catch (error) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error signing you in!'
        })
        console.error('Error storing the value', error);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      {loading && <Loader text='Loading...' />}
      <Toast autoHide visibilityTime={3000} position='top' />
      <View className='flex-1 p-5'>
        <Text className='text-2xl font-bold mb-4'>Sign In</Text>
        <Text>Enter Your Details</Text>
        <ScrollView className=''>
          <Input
            label='Email'
            error={errors.email}
            keyboardType="email-address"
            value={formData.email}
            password={false}
            iconName='envelope-o'
            className='px-1'
            onFocus={() => handleError(null, 'email')}
            onChangeText={(text: string) => handleChange(text, 'email')}
          />
          <Input
            label='Password'
            placeholder='Password'
            error={errors.password}
            value={formData.password}
            password={true}
            iconName='user-o'
            className='px-1'
            onFocus={() => handleError(null, 'password')}
            onChangeText={(text: string) => handleChange(text, 'password')}
          />
          <LevelSelection
            onValueChange={(text: string) => handleChange(text, 'level')} />


        </ScrollView>
        <TouchableOpacity className='bg-purple-500 p-3 rounded-md mt-auto' onPress={() => handleSignIn()}>
          <Text className='text-white text-center'>Sign In</Text>
        </TouchableOpacity>
        <View className='flex flex-row justify-end'>
          <Text className='text-red-500 ms-auto w-auto' onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password</Text>
        </View>
        <View className='flex flex-row gap-x-3 justify-center'>
          <Text>Don't have an account?</Text>
          <Text className='text-blue-500' onPress={() => navigation.navigate('CreateAccount')}>Create account</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default SignIn;
