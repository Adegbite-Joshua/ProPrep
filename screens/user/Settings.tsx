import React from 'react'
import { SafeAreaView, Text, View, Pressable } from 'react-native'

const Settings = () => {
  return (
    <SafeAreaView className=' flex-1'>
      <View className='w-4/5 mx-auto flex-1'>
        <Pressable className='border-b-1 border-gray-300 w-auto p-2 '>
          <Text>Change Profile</Text>
        </Pressable>
        <Pressable className='border-b-1 border-gray-300 w-auto p-2 '>
          <Text>Update Offline Questions</Text>
        </Pressable>
        <Pressable className='border-b-1 border-gray-300 w-auto p-2 '>
          <Text>Change Question's Number</Text>
        </Pressable>

        <Pressable className='border-b-1 border-gray-300 w-32 p-3 mt-auto mb-5 bg-red-500 mx-auto rounded-xl'>
          <Text className='text-white text-center'>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Settings