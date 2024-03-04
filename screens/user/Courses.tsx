import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { courseCodes, serverUrl } from '../../constants/constants';
import getUserCourses from '../../customHooks/getUserCourses';
import getUserDetails from '../../customHooks/getUserDetails';
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import getAttemptedQuestions from '../../customHooks/getAttemptedQuestions';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';



const Courses = ({ navigation }) => {
  const [userCourses] = getUserCourses();
  const [userDetails] = getUserDetails();
  const [isConnected] = getNetworkInfo();

  // const attemptedQuestion =  useSelector((state: any) => state.userDetails.attemptedQuestions || {});

  const { fetchAttemptedQuestions, attemptedQuestions } = getAttemptedQuestions();

  const getRandomQuestions = (array, count) => {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, count);
  }

  const getQuizQuestions = async (course) => {
    try {
      const numberOfQuestions = Number(await AsyncStorage.getItem('@questionsNumberValue')) || 15;

      if (!isConnected) {
        const allCoursesQuestions = JSON.parse(await AsyncStorage.getItem('@allCoursesQuestions'));
        const quizQuestions = allCoursesQuestions[course?.semester][course.courseCode];

        navigation.navigate('Test', { questionDetails: { questions: getRandomQuestions(quizQuestions, numberOfQuestions), startingTime: Date.now() } });
        return;
      }
      let reqBody = {
        level: userDetails?.level,
        department: course?.department,
        semester: userDetails?.semester,
        courseCode: course.courseCode,
        numberOfQuestions
      };
      const getQuestions: any = await axios.post(`${serverUrl}/api/testing_route/question/get_questions`, reqBody);
      if (getQuestions.status == 200) {
        console.log(getQuestions.data)
        navigation.navigate('Test', { courseCode: course.courseCode, questionDetails: getQuestions.data });
      }
    } catch (error) {
      alert('Something went wrong!')
      console.log('Error getting quiz questions', error);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: ()=>(<TouchableOpacity
          className='border-2 border-purple-500 bg-transparent rounded-md text-purple-500 p-2 ms-auto me-3'
          // onPress={() => previousQuizzes()}
        >
          <Text className='text-purple-500'>Previous Quizzes</Text>
        </TouchableOpacity>)
    })
  }, [])

  const previousQuizzes = async () => {
    if (attemptedQuestions.length < 100) {
      await fetchAttemptedQuestions(0, 100);
      console.log(attemptedQuestions);
      navigation.navigate('TakenTest')
    }
  }
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='p-4'>
        
        {userCourses.map((course, index) => (
          <View key={index} className='flex-row items-center border-b-2  border-gray-400 justify-between mb-4 rounded p-4'>
            <Text className='mr-2 '>{courseCodes[course.courseCode]}</Text>
            <View className='flex flex-row gap-2'>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => getQuizQuestions(course)}
              >
                <Text className=''>Take Quiz</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Courses;
