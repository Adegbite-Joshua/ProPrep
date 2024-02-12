import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TestTaking from '../../components/TestPage/TestTaking'

const TestPage = ({navigation}) => {

  return (
    <SafeAreaView className='flex-1'>
      <TestTaking navigation={navigation} />      
    </SafeAreaView>
  )
}

export default TestPage