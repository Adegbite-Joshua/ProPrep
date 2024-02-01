import { View, Text, SafeAreaView } from 'react-native'
import React, { Fragment } from 'react'

const Dashboard = () => {
  return (
    <SafeAreaView className='p-5'>
      <View className='bg-blue-700 rounded-lg'>
        <Text>Welcome Back</Text>
        <Text>Level: 100</Text>
        <Text>Department: Computer Science</Text>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard