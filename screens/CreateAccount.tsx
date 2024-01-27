// Import necessary components from React Native and Tailwind CSS
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../components/Forms/Input';

// CreateAccount component
const CreateAccount = ({navigation}) => {
  // State to hold user input
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
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
        label='Email'
        error='Input email'/>
      <TextInput
        className='input'
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />

      <TextInput
        className='input'
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />

      <TextInput
        className='input'
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      <TextInput
        className='input'
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      />

      <TextInput
        className='input'
        placeholder="Level"
        value={formData.level}
        onChangeText={(text) => setFormData({ ...formData, level: text })}
      />

      <TextInput
        className='input'
        placeholder="Department"
        value={formData.department}
        onChangeText={(text) => setFormData({ ...formData, department: text })}
      />

      {/* Button to submit the form */}
      <TouchableOpacity className='bg-blue-500 p-3 rounded-md mt-4' onPress={handleCreateAccount}>
        <Text className='text-white text-center'>Create Account</Text>
      </TouchableOpacity>
      <Text className='text-blue-500' onPress={()=>navigation.navigate('SignIn')}>Create account</Text>
      <Text className='text-blue-500' onPress={()=>navigation.navigate('CreateAccount')}>Create account</Text>
    </SafeAreaView>
  );
};


export default CreateAccount;
