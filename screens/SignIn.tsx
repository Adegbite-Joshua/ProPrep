// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Input from '../components/Forms/Input';
import LevelSelection from '../components/Forms/LevelSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../components/Loader';
import { serverUrl } from '../constants/constants';


interface errorsProps {
  email?: string | null,
  password?: string | null,
  level?: string | null,
}

// SignIn component
const SignIn = ({ navigation }) => {

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
          // toast.success('Toast Message \n jkjjkf', {
          //   duration: 3000,
          //   hideOnPress: true
          // })
        }
      } catch (error) {
        setLoading(false);

        console.error('Error storing the value', error);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      {loading && <Loader text='Loading...' />}
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
        <TouchableOpacity className='bg-blue-500 p-3 rounded-md mt-auto' onPress={() => handleSignIn()}>
          <Text className='text-white text-center'>Sign In</Text>
        </TouchableOpacity>
        <View className='flex flex-row gap-x-3'>
          <Text>Don't have an account?</Text>
          <Text className='text-blue-500' onPress={() => navigation.navigate('CreateAccount')}>Create account</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default SignIn;
