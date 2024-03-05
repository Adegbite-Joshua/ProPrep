// ForgotPasswordFlowScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import Input from '../components/Forms/Input';
import Toast from 'react-native-toast-message';
import getNetworkInfo from '../customHooks/getNetworkInfo';
import axios from 'axios';
import { serverUrl } from '../constants/constants';
import { AntDesign } from '@expo/vector-icons';


interface errorsProps {
  fullName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  password?: string | null,
  level?: string | null,
  department?: string | null,
}

const ForgotPasswordFlowScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email');
  const [isConnected] = getNetworkInfo();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (<AntDesign onPress={() => navigation.goBack()} className='me-auto' name="arrowleft" size={24} color="black" />)
    })
  }, [])

  const handleNext = async () => {
    if (!isConnected) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong, try again!'
      })
      return;
    }
    if (step === 'email') {
      if (email.trim() == '') {
        Toast.show({
          type: 'warning',
          text1: 'Email required',
          text2: 'Email field is required'
        })
        return;
      }
      try {
        const sendToken: any = await axios.post(`${serverUrl}/api/testing_route/user/send_forgot_password_token`, { email })
        if (sendToken.status == 200) {
          console.log(sendToken.data.token)
          setVerificationCode(`${sendToken.data.token}`);
          setStep('verificationCode');
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid email address'
        })
        console.error('Error storing the value', error);
      }
    }
    else if (step === 'verificationCode') {
      if (verificationCode == verificationCodeInput) {
        setStep('newPassword');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid token!'
        })
      }
    }
    else if (step === 'newPassword') {
      if (newPassword != confirmPassword) {
        Toast.show({
          type: 'info',
          text1: 'Mismatch',
          text2: 'The passwords must be the same'
        })
        return;
      }
      try {
        const sendToken: any = await axios.post(`${serverUrl}/api/testing_route/user/reset_password`, { email, password: newPassword })
        if (sendToken.status == 200) {
          navigation.navigate('SignIn');
          Toast.show({
            type: 'success',
            text1: 'Successful',
            text2: 'Password updated successfully!'
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid email address'
        })
        console.error('Error storing the value', error);
      }
    }
  };
  const [errors, setErrors] = useState<errorsProps>({});

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevStates) => ({ ...prevStates, [input]: errorMessage }))
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Toast autoHide visibilityTime={3000} position='top' />
      <Text className="text-2xl font-bold mb-4">
        {step === 'email' && 'Forgot Your Password?'}
        {step === 'verificationCode' && 'Verification Code'}
        {step === 'newPassword' && 'Create New Password'}
      </Text>
      {step === 'email' && (
        <View>
          <Text className="mb-4">
            Please enter your email address to receive a verification code.
          </Text>
          <Input
            label='Email'
            error={errors.email}
            // placeholder='Email address'
            keyboardType="email-address"
            value={email}
            password={false}
            iconName='envelope-o'
            className='px-1'
            onFocus={() => handleError(null, 'email')}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>
      )}


      {step === 'verificationCode' && (
        <View>
          <Text className="mb-4">
            Check your email for the verification code and enter it below.
          </Text>
          <Input
            label='Input token'
            error={null}
            value={verificationCodeInput}
            password={false}
            iconName={null}
            className='px-1'
            onFocus={() => handleError(null, 'fullName')}
            onChangeText={(text: string) => setVerificationCodeInput(text)}
          />
        </View>
      )}
      {step === 'newPassword' && (
        <View>
          <Text className="mb-4">Enter your new password and confirm it below.</Text>
          <Input
            label='New Password'
            // placeholder='New Password'
            error={errors.password}
            value={newPassword}
            password={true}
            iconName='user-o'
            className='px-1'
            onFocus={() => handleError(null, 'password')}
            onChangeText={(text: string) => setNewPassword(text)}
          />
          <Input
            label='Confirm Password'
            // placeholder='Confirm Password'
            error={errors.password}
            value={confirmPassword}
            password={true}
            iconName='user-o'
            className='px-1'
            onFocus={() => handleError(null, 'password')}
            onChangeText={(text: string) => setConfirmPassword(text)}
          />
        </View>
      )}
      <View className='flex flex-row justify-center my-5'>
        <TouchableOpacity
          className='bg-purple-500 rounded-md p-2 ms-auto me-3'
          onPress={() => handleNext()}
        >
          <Text className='text-white'>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordFlowScreen;
