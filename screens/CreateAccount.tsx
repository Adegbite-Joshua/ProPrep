// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Keyboard, View, Image } from 'react-native';
import Input from '../components/Forms/Input';
import LevelSelection from '../components/Forms/LevelSelection';
import DepartmentSelection from '../components/Forms/SelectDepartment';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { serverUrl } from '../constants/constants';
import Toast from 'react-native-toast-message';


interface errorsProps {
  fullName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  password?: string | null,
  level?: string | null,
  department?: string | null,
}

// CreateAccount component
const CreateAccount = ({ navigation }) => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    level: '',
    department: '',
  });

  const [errors, setErrors] = useState<errorsProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: string, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: value }))
  }

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  const handleCreateAccount = async() => {
    Keyboard.dismiss();
    // toast.success('Toast Message \n jkjjkf', {
    //   duration: 3000,
    //   hideOnPress: true
    // })
    // return;
    let validDetails = true;
    if (!formData.fullName) {
      handleError('Input your full name', 'fullName')
      validDetails = false;
    }
    if (!formData.email) {
      handleError('Input your email', 'email')
      validDetails = false;
    } else if (!formData.email.match(/\S+@\S+\.\S+/)) {
      handleError('Enter valid email', 'email')
      validDetails = false;
    }
    if (!formData.phoneNumber) {
      handleError('Input your phone number', 'phoneNumber')
      validDetails = false;
    }
    if (!formData.password) {
      handleError('Input your password', 'password')
      validDetails = false;
    }

    if (validDetails) {
      try {
        setLoading(true);
        await AsyncStorage.setItem('created_an_account', JSON.stringify({value: true}));
        const sendSignUp = await axios.post(`${serverUrl}/api/testing_route/user/create_account`, formData)
        console.log(sendSignUp)
        if(sendSignUp.status == 201) {
          setLoading(false);
          navigation.navigate('SignIn');
          Toast.show({
            type: 'success',
            text1: 'Successful',
            text2: 'Account created successfully'
          })
        }
  
      } catch (error) {
        setLoading(false);
        if(error.response.status == 409){
          // Alert.alert('Error!','User already exist with this email');
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'User already exist with this email!'
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'Something went wrong!'
          })
          // Alert.alert('Error!','Something went wrong!');
        }
        console.error('Error storing the value', error);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      {loading && <Loader text='Loading...' />}
      <View className='flex-1 p-4'>
        <Text className='text-2xl font-bold mb-4'>ProPrep - Register</Text>
        <Text>Enter Your Details to Register</Text>
        <ScrollView className=''>
          <Input
            label='Full Name'
            error={errors.fullName}
            value={formData.fullName}
            // keyboardType="text"
            password={false}
            iconName='address-book-o'
            className='px-1'
            onFocus={() => handleError(null, 'fullName')}
            onChangeText={(text: string) => handleChange(text, 'fullName')}
          />
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
          <Input
            label='Phone Number'
            error={errors.phoneNumber}
            placeholder="+234700000000"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            password={false}
            iconName='phone'
            className='px-1'
            onFocus={() => handleError(null, 'phoneNumber')}
            onChangeText={(text: string) => handleChange(text, 'phoneNumber')}
          />
          <LevelSelection
            onValueChange={(text: string) => handleChange(text, 'level')} />
          <DepartmentSelection
            onValueChange={(text: string) => handleChange(text, 'department')} />

          <TouchableOpacity className='bg-purple-500 p-3 rounded-md mt-24' onPress={handleCreateAccount}>
            <Text className='text-white text-center'>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-purple-500 rounded-md mt-4 flex flex-row justify-center items-center' onPress={() => { }}>
            <Image source={require('../assets/google-icon.png')} className='h-16 w-16' />
            <Text className='text-white text-center'>Continue With Google</Text>
          </TouchableOpacity>
        </ScrollView>
        <View className='flex flex-row justify-center my-5'>
          <Text>New user?</Text>
          <Text className='text-blue-500' onPress={() => navigation.navigate('SignIn')}>Sign in</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default CreateAccount;
