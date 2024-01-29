// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Input from '../components/Forms/Input';


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
  // State to hold user input
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    level: '',
    department: '',
  });
  const [errors, setErrors] = useState<errorsProps>({});

  const handleChange = (value: string, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: value }))
  }
  const handleError = (errorMessage: string | null, input: string) => {
    setFormData((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  const handleCreateAccount = () => {
    console.log('Form data submitted:', formData);
    Keyboard.dismiss();
    let validDetails = true;
    if (!formData.fullName) {
      handleError('Input your full name', 'fullName')
    }
    if (!formData.email) {
      handleError('Input your email', 'email')
    } else if (!formData.email.match(/\S+@\S+\.\S+/)) {
      handleError('Enter valid email', 'email')      
    }
    if (!formData.phoneNumber) {
      handleError('Input your phone number', 'phoneNumber')
    }
    if (!formData.password) {
      handleError('Input your password', 'password')
    }
  };

  return (
    <SafeAreaView className='flex-1 p-4'>
      <Text className='text-2xl font-bold mb-4'>Register</Text>
      <Text>Enter Your Details to Register</Text>
      <ScrollView>
        <Input
          label='Full Name'
          error={errors.fullName}
          value={formData.fullName}
          password={false}
          iconName='email'
          className='px-1'
          onFocus={() => handleError(null, 'fullName')}
          onChangeText={(text: string) => handleChange(text, 'fullName')}
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
          label='Phone Number'
          error={errors.phoneNumber}
          placeholder="+234700000000"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          password={false}
          iconName='email'
          className='px-1'
          onFocus={() => handleError(null, 'phoneNumber')}
          onChangeText={(text: string) => handleChange(text, 'phoneNumber')}
        />
      </ScrollView>


      <TouchableOpacity className='bg-blue-500 p-3 rounded-md mt-4' onPress={handleCreateAccount}>
        <Text className='text-white text-center'>Create Account</Text>
      </TouchableOpacity>
      <Text className='text-blue-500' onPress={() => navigation.navigate('SignIn')}>Create account</Text>
      <Text className='text-blue-500' onPress={() => navigation.navigate('CreateAccount')}>Create account</Text>
    </SafeAreaView>
  );
};


export default CreateAccount;
