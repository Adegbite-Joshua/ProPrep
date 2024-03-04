// ForgotPasswordFlowScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ForgotPasswordFlowScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email'); // Initial step is email entry

  const handleNext = () => {
    if (step === 'email') {
      
      setStep('verificationCode');
    }

    // Step 2: Handle verification code entry
    else if (step === 'verificationCode') {
      setStep('newPassword');
    }

    // Step 3: Handle new password entry
    else if (step === 'newPassword') {
      navigation.navigate('SignIn'); // Redirect to Sign In page after resetting the password
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">
        {step === 'email' && 'Forgot Your Password?'}
        {step === 'verificationCode' && 'Verification Code'}
        {step === 'newPassword' && 'Create New Password'}
      </Text>
      {step === 'email' && (
        <>
          <Text className="mb-4">
            Please enter your email address to receive a verification code.
          </Text>
          <TextInput
            className="border border-gray-500 p-2 mb-4 w-full"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </>
      )}
      {step === 'verificationCode' && (
        <>
          <Text className="mb-4">
            Check your email for the verification code and enter it below.
          </Text>
          <TextInput
            className="border border-gray-500 p-2 mb-4 w-full"
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
          />
        </>
      )}
      {step === 'newPassword' && (
        <>
          <Text className="mb-4">Enter your new password and confirm it below.</Text>
          <TextInput
            className="border border-gray-500 p-2 mb-4 w-full"
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            className="border border-gray-500 p-2 mb-4 w-full"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </>
      )}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default ForgotPasswordFlowScreen;
