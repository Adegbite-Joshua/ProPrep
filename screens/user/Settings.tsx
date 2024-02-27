import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { SafeAreaView, Text, View, Pressable, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { courseCodes, serverUrl } from '../../constants/constants';
import getUserDetails from '../../customHooks/getUserDetails';




const Settings = ({ navigation }) => {
  const [userDetails] = getUserDetails();

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

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      Toast.show({
        type: 'success',
        text1: 'Successful',
        text2: 'Signing out successful'
      })
      navigation.navigate('SignIn');
    } catch (err) {
      console.log(err)
    }

  }

  const downloadOfflineQuestions = async() => {
    try {
      const numberOfQuestions = Number(await AsyncStorage.getItem('@questionsNumberValue')) || 15;      
      let reqBody = {
        level: userDetails?.level,
        department: userDetails?.department,
        semester: userDetails?.semester,
        numberOfQuestions
      };
      const offlineQuestions: any = await axios.post(`${serverUrl}/api/testing_route/question/get_questions`, reqBody);
      if (offlineQuestions.status == 200) {
        await AsyncStorage.setItem('@offlineQuestions', JSON.stringify(offlineQuestions.data));
        Toast.show({
          type: 'success',
          text1: 'Successful',
          text2: 'Offline questions downloaded'
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occur while downloading the questions, please try again'
      })
      console.log('Error getting quiz questions', error);
    }
  }

  return (
    <View className='flex-1'>
      <Toast autoHide visibilityTime={3000} position='top' />
      <SafeAreaView className=' flex-1'>
        <View className='w-4/5 mx-auto flex-1'>
          <Pressable className='border-b border-gray-300 w-auto p-3 '>
            <Text>Change Profile</Text>
          </Pressable>
          <Pressable className='border-b border-gray-300 w-auto p-3 '>
            <Text>Download Offline Questions</Text>          
          </Pressable>
          <Pressable className='border-b border-gray-300 w-auto p-3 '>
            <Text>Change Question's Number</Text>
            <SelectList
              boxStyles={styles.input}
              setSelected={async (value: string) => await AsyncStorage.setItem('@questionsNumberValue', value)}
              data={questionsNumberValue}
              search={false}
              defaultOption={{ value: '15 Questions', key: 15 }}
              placeholder='Select Level' />

          </Pressable>
          <Pressable className='border-b border-gray-300 w-auto p-3 '>
            <Text>Change Semester</Text>
            <SelectList
              boxStyles={styles.input}
              setSelected={async (value: string) => await AsyncStorage.setItem('@semester', value)}
              data={semestersValue}
              search={false}
              defaultOption={{ value: '1st Semester', key: 'firstSemester' }}
              placeholder='Select Level' />

          </Pressable>
          

          <Pressable onPress={() => signOut()} className='border-b-1 border-gray-300 w-32 p-3 mt-auto mb-5 bg-red-500 mx-auto rounded-xl'>
            <Text className='text-white text-center'>Sign Out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
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