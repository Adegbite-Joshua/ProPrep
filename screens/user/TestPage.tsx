import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TestTaking from '../../components/TestPage/TestTaking'

const TestPage = () => {

  return (
    <SafeAreaView className='flex-1'>
      <TestTaking/>      
    </SafeAreaView>
  )
}

export default TestPage