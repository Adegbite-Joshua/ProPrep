// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../components/Forms/Input';

// CreateAccount component
const CreateAccount = ({navigation}) => {
  // State to hold user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    level: '',
    department: '',
  });

  const handleCreateAccount = () => {
    console.log('Form data submitted:', formData);
  };

  return (
    <SafeAreaView className='flex-1 p-4'>
      <Text className='text-2xl font-bold mb-4'>Register</Text>
      <Text>Enter Your Details to Register</Text>
      
      <Input 
        label='Full Name'
        error='Input full name'        
        value={formData.name}
        password={false}
        iconName='person'
        onChangeText={setFormData}
        />
      <Input 
        label='Password'
        error='Input password'        
        value={formData.password}
        password={true}
        iconName='person'
        onChangeText={setFormData}
        />
      <Input 
        label='Email'
        error='Input email'
        keyboardType="email-address"
        value={formData.email}
        password={false}
        iconName='email'
        onChangeText={(text: string) => setFormData({ ...formData, email: text })}
        />
      <Input 
        label='Phone Number'
        error='Input phone number'
        className='input'
        placeholder="+234700000000"
        keyboardType="phone-pad"
        value={formData.phoneNumber}
        password={false}
        iconName='email'
        onChangeText={(text: string) => setFormData({ ...formData, phoneNumber: text })}
        />


      <TouchableOpacity className='bg-blue-500 p-3 rounded-md mt-4' onPress={handleCreateAccount}>
        <Text className='text-white text-center'>Create Account</Text>
      </TouchableOpacity>
      <Text className='text-blue-500' onPress={()=>navigation.navigate('SignIn')}>Create account</Text>
      <Text className='text-blue-500' onPress={()=>navigation.navigate('CreateAccount')}>Create account</Text>
    </SafeAreaView>
  );
};


export default CreateAccount;
