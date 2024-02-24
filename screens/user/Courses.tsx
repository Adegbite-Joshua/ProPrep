import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { courseCodes, serverUrl } from '../../constants/constants';
import getUserCourses from '../../customHooks/getUserCourses';
import getUserDetails from '../../customHooks/getUserDetails';
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import { ScrollView } from 'react-native';



const Courses = ({ navigation }) => {
  const [userCourses] = getUserCourses();
  const [userDetails] = getUserDetails();
  const [isConnected] = getNetworkInfo();

  const getRandomQuestions = (array, count) => {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, count);
  }

  const getQuizQuestions = async (courseCode = 'phy101') => {
    
    try {
      const numberOfQuestions = Number(await AsyncStorage.getItem('@questionsNumberValue')) || 15;

      if (!isConnected) {
        const allCoursesQuestions = JSON.parse(await AsyncStorage.getItem('@allCoursesQuestions'));
        const quizQuestions = allCoursesQuestions[userDetails?.semester][courseCode];
        
        navigation.navigate('Test', { questionDetails: { questions: getRandomQuestions(quizQuestions, numberOfQuestions), startingTime: Date.now() } });
        return;
      }
      let reqBody = {
        level: userDetails?.level,
        department: userDetails?.department,
        semester: userDetails?.semester,
        courseCode,
        numberOfQuestions
      };
      console.log(reqBody);
      const getQuestions: any = await axios.post(`${serverUrl}/api/testing_route/question/get_questions`, reqBody);
      if (getQuestions.status == 200) {
        navigation.navigate('Test', { questionDetails: getQuestions.data });        
      }
    } catch (error) {
      console.log('Error getting quiz questions', error);
    }
  }
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='p-4'>
        {userCourses.map((courseCode, index) => (
          <View key={index} className='flex-row items-center border-b-2  border-gray-400 justify-between mb-4 rounded p-4'>
            <Text className='mr-2 '>{courseCodes[courseCode]}</Text>
            <View className='flex flex-row gap-2'>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => getQuizQuestions(courseCode)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Courses;
