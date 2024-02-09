// components/Instructions.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Instructions = () => {
  const startTest = () => {
    // Navigate to the TestTaking screen
    // You can implement navigation logic here
    // For now, we'll just log a message
    console.log('Navigate to TestTaking screen');
  };

  return (
    <View className='flex-1 justify-center items-center p-4'>
      <Text className='text-lg mb-4 text-center'>
        Welcome to ProPrep - CBT Exam Preparations!
      </Text>
      <Text className='text-base mb-4'>
        Subject: Mathematics{'\n'}
        Total Questions: 20
      </Text>
      <Text className='text-base mb-4'>
        Instructions:{'\n'}
        1. Answer all questions.{'\n'}
        2. You have 30 minutes to complete the test.
      </Text>
      <Button title="Start Test" onPress={startTest} />
    </View>
  );
};

export default Instructions;
