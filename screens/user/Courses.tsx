import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { courseCodes, serverUrl } from '../../constants/constants';
import getUserCourses from '../../customHooks/getUserCourses';
import getUserDetails from '../../customHooks/getUserDetails';

const Courses = ({navigation}) => {
  const [userCourses] = getUserCourses();
  const [userDetails] = getUserDetails();


  const getQuizQuestions =async()=>{
    try {
      let reqBody = {
        level: userDetails?.level,
        department: userDetails?.department,
        semester: userDetails?.semester,
        
      };
      const sendSignUp:any = await axios.post(`${serverUrl}/api/testing_route/user/sign_in`, )
      if (sendSignUp.status == 200) {
        navigation.navigate('BottomTabs', { screen: 'Dashboard' });
        // toast.success('Toast Message \n jkjjkf', {
        //   duration: 3000,
        //   hideOnPress: true
        // })
      }
    } catch (error) {(false);

      console.error('Error storing the value', error);
    }
  }
  return (
    <SafeAreaView className='flex-1'>
      <View className='p-4'>
        {userCourses.map((courseCode, index) => (
          <View key={index} className='flex-row items-center border-b-2  border-gray-400 justify-between mb-4 rounded p-4'>
            <Text className='mr-2 '>{courseCodes[courseCode]}</Text>
            <View className='flex flex-row gap-2'>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => navigation.navigate('Test', {courseCode})}
              >
                <Text className=''>Take Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => navigation.navigate('TakenTest')}
              >
                <Text className=''>Previous Quizzes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Courses;
