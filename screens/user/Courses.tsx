import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import axios from 'axios';
import { courseCodes, serverUrl } from '../../constants/constants';
import getUserCourses from '../../customHooks/getUserCourses';
import getUserDetails from '../../customHooks/getUserDetails';
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import getAttemptedQuestions from '../../customHooks/getAttemptedQuestions';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
import * as Notix from 'notix-rn';



const Courses = ({ navigation }) => {
  const [userCourses] = getUserCourses();
  const [userDetails] = getUserDetails();
  const [isConnected] = getNetworkInfo();

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
      const allQuestionsString = await AsyncStorage.getItem('@offlineQuestions');
      if (!isConnected && allQuestionsString != 'null' ) { 
        const allCoursesQuestions = JSON.parse(allQuestionsString);
        if (!allCoursesQuestions[course.department][userDetails?.semester]['questions']) {
          Alert.alert(
            'No question found for these semester',
            'You are not connected and you do not have any stored locally on your device',
            [
              // {
              //   text: 'Cancel',
              //   style: 'cancel',
              // },
              {
                text: 'OK',
                onPress: () => {
                },
              },
            ],
            { cancelable: false }
          );
          return;
        }
        const quizQuestions = allCoursesQuestions[course.department][userDetails?.semester]['questions'][course.courseCode];
        console.log(quizQuestions)       
        let questions = getRandomQuestions(quizQuestions, numberOfQuestions);
        navigation.navigate('Test', { questionDetails: { questions, startingTime: Date.now() } });
        return;
      } else if (!isConnected && allQuestionsString == 'null') {
        console.log('not found')
        Alert.alert(
          'No question found',
          'You are not connected and you do not have any stored locally on your device',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
              },
            },
          ],
          { cancelable: false }
        );
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
      Alert.alert('Something went wrong!')
      console.log('Error getting quiz questions', error);
    }
  }

  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (<View className='p-2'>
        <TouchableOpacity
          className='bg-purple-500 rounded-md p-2 ms-auto me-3'
          onPress={() => previousQuizzes()}
        >
          <Text className='text-white'>Previous Quizzes</Text>
        </TouchableOpacity>
      </View>)
    })
  }, [])

  // useEffect(()=>{
  //   (async()=>{
  //     let interstitialLoader: Notix.InterstitialLoader;

  //     interstitialLoader = await Notix.Interstitial.createLoader(7194365);
  //     interstitialLoader.startLoading();
  //     let interstitialData;
  //     try {
  //       interstitialData = await interstitialLoader.next(5000);
  //     } catch (e){
  //       console.log('monetag error', e)
  //     }
  //     Notix.Interstitial.show(interstitialData)
  //   })()
  // }, [])

  const previousQuizzes = async () => {
    if (attemptedQuestions.length < 100) {
      await fetchAttemptedQuestions(0, 100);
      console.log(attemptedQuestions);
      navigation.navigate('Taken Test')
    } else {
      navigation.navigate('Taken Test')
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
