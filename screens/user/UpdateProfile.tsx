// Import necessary components from React Native and Tailwind CSS
import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import { AntDesign } from '@expo/vector-icons';



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
  const [isConnected] = getNetworkInfo();


  const [formData, setFormData] = useState({
    fullName: userDetails.fullName,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
    password: '',
    level: userDetails.level,
    department: userDetails.department,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: ()=>(<AntDesign onPress={()=>navigation.goBack()} className='me-auto' name="arrowleft" size={24} color="black" />)
    })
  }, [])
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

  const handleUpdateProfile = async () => {
    Keyboard.dismiss();
  
    let validDetails = true;
    const updatedData: any = {};
  
    if (formData.fullName !== userDetails.fullName) {
      updatedData.fullName = formData.fullName;
    }
  
    if (formData.email !== userDetails.email) {
      if (!formData.email.match(/\S+@\S+\.\S+/)) {
        handleError('Enter valid email', 'email');
        validDetails = false;
      } else {
        updatedData.email = formData.email;
      }
    }
  
    if (formData.phoneNumber !== userDetails.phoneNumber) {
      updatedData.phoneNumber = formData.phoneNumber;
    }
  
    if (formData.password !== '') {
      updatedData.password = formData.password;
    }
  
    console.log(formData);
    if (validDetails && Object.keys(updatedData).length > 0) {
      console.log(updatedData);
      
      // try {
      //   setLoading(true);
      //   const sendUpdate = await axios.put(`${serverUrl}/api/testing_route/user/update_profile`, updatedData);
      //   console.log(sendUpdate);
  
      //   if (sendUpdate.status === 200) {
      //     setLoading(false);
      //     navigation.navigate('SignIn');
      //     Toast.show({
      //       type: 'success',
      //       text1: 'Successful',
      //       text2: 'Profile updated successfully',
      //     });
      //   }
      // } catch (error) {
      //   setLoading(false);
      //   // Handle error
      //   console.error('Error updating profile', error);
      // }
    }
  };
  

  return (
    <SafeAreaView className='flex-1'>
      {loading && <Loader text='Loading...' />}
      <View className='flex-1 p-4'>
        {/* <Text className='text-2xl font-bold mb-4 my-3'>Update Profile</Text> */}
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
            editable={false}
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
