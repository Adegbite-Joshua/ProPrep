// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Input from '../components/Forms/Input';
import LevelSelection from '../components/Forms/LevelSelection';


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

  const handleChange = (value: string, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: value }))
  }

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  const handleSignIn = () => {
    console.log('Form data submitted:', formData);
    Keyboard.dismiss();
    let validDetails = true;
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
  };

  return (
    <SafeAreaView className='flex-1 p-4'>
      <Text className='text-2xl font-bold mb-4'>Register</Text>
      <Text>Enter Your Details to Register</Text>
      <ScrollView>
        <Input
          label='Email'
          error={errors.email}
          keyboardType="email-address"
          value={formData.email}
          password={false}
          iconName='email'
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
          iconName='email'
          className='px-1'
          onFocus={() => handleError(null, 'password')}
          onChangeText={(text: string) => handleChange(text, 'password')}
        />
        <LevelSelection
          onValueChange={(text: string) => handleChange(text, 'level')} />

        <TouchableOpacity className='bg-blue-500 p-3 rounded-md mt-4' onPress={() => navigation.navigate('Dashboard')}>
          <Text className='text-white text-center'>Sign In</Text>
        </TouchableOpacity>
        <View className='flex flex-row gap-x-3'>
          <Text>Don't have an account?</Text>
          <Text className='text-blue-500' onPress={() => navigation.navigate('SignIn')}>Create account</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default SignIn;
