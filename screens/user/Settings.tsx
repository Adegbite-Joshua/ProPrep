import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

const Settings = () => {
  const semestersValue = [
    { value: '1st Semester', key: 'firstSemester' },
    { value: '2nd Semester', key: 'secondSemester' },
  ];

  const questionsNumberValue = [
    { value: '15 Questions', key: 15 },
    { value: '30 Questions', key: 30 },
    { value: '45 Questions', key: 45 },
    { value: '60 Questions', key: 60 },
  ];

  return (
    <SafeAreaView className=' flex-1'>
      <View className='w-4/5 mx-auto flex-1'>
        <Pressable className='border-b border-gray-300 w-auto p-3 '>
          <Text>Change Profile</Text>
        </Pressable>
        <View className='border-b border-gray-300 w-auto p-3 '>
          <Text>Update Offline Questions</Text>
        </View>
        <Pressable className='border-b border-gray-300 w-auto p-3 '>
          <Text>Change Question's Number</Text>
          <SelectList
            boxStyles={styles.input}
            setSelected={() => ('')}
            data={questionsNumberValue}
            search={false}
            defaultOption={{ value: '15 Questions', key: 15 }}
            placeholder='Select Level' />

        </Pressable>
        <Pressable className='border-b border-gray-300 w-auto p-3 '>
          <Text>Change Semester</Text>
          <SelectList
            boxStyles={styles.input}
            setSelected={async (value:string) => await AsyncStorage.setItem('@semester', value)}
            data={semestersValue}
            search={false}
            defaultOption={{ value: '1st Semester', key: 'first' }}
            placeholder='Select Level' />

        </Pressable>

        <Pressable className='border-b-1 border-gray-300 w-32 p-3 mt-auto mb-5 bg-red-500 mx-auto rounded-xl'>
          <Text className='text-white text-center'>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
  },
})