// Import necessary components from React Native and Tailwind CSS
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Keyboard, View, Image } from 'react-native';
import Input from '../../components/Forms/Input';
import LevelSelection from '../../components/Forms/LevelSelection';
import DepartmentSelection from '../../components/Forms/SelectDepartment';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { serverUrl } from '../../constants/constants';
import Toast from 'react-native-toast-message';
import getUserDetails from '../../customHooks/getUserDetails';



interface errorsProps {
  fullName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  password?: string | null,
  level?: string | null,
  department?: string | null,
}

// UpdateProfile component
const UpdateProfile = ({ navigation }) => {
  const [userDetails] = getUserDetails();

  const [formData, setFormData] = useState({
    fullName: userDetails.fullName,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
    password: '',
    level: userDetails.level,
    department: userDetails.department,
  });

  useEffect(()=>{
    setFormData({
      fullName: userDetails.fullName,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      password: '',
      level: userDetails.level,
      department: userDetails.department,
    })
  }, [userDetails])

  const [errors, setErrors] = useState<errorsProps>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: string, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: value }))
  }

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  const handleUpdateProfile = async() => {
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
            text2: 'Profile updated successfully'
          })
        }
  
      } catch (error) {
        setLoading(false);
        if(error.response.status == 409){
          // Alert.alert('Error!','User already exist with this email');
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: ''
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
      <View className='flex-1 p-5'>
        <Text className='text-2xl font-bold mb-4 my-3'>Update Profile</Text>
        <ScrollView className='my-2'>
          <Input
            label='Full Name'
            error={errors.fullName}
            value={formData.fullName}
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

        </ScrollView>
        <TouchableOpacity className='bg-purple-500 p-3 mt-auto rounded-md' onPress={handleUpdateProfile}>
          <Text className='text-white text-center'>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default UpdateProfile;
