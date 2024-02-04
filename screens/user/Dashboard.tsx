import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { Fragment } from 'react'

const Dashboard = () => {
  return (
    <SafeAreaView className='p-5'>
      <View className="bg-purple-700 rounded-lg p-5 h-64 flex flex-row justify-between">
        <Image source={require('../../assets/google-icon.png')} className="w-24 h-24 rounded-lg" />
        <View className="justify-end">
          <Text className="text-white">Welcome, Joshua</Text>
          <Text className="text-white">Level: 100</Text>
          <Text className="text-white">Department: Computer Science</Text>
        </View>
      </View>
      <View>
        <Text className='my-3 font-bold'>Top Courses</Text>
        <View className='flex flex-row flex-wrap'>
          <View className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </View>
          <View className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </View>
          <View className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </View>
          <View className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </View>
          <View className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

