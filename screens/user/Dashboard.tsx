import { View, Text, SafeAreaView, Image, Pressable, Modal, TouchableOpacity, Alert } from 'react-native'
import getUserDetails from '../../customHooks/getUserDetails';
import getUserCourses from '../../customHooks/getUserCourses';
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import getLatestUpdate from '../../customHooks/getLatestUpdate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { courseCodes, serverUrl } from '../../constants/constants';

const Dashboard = ({ navigation }) => {
  const [userDetails] = getUserDetails();
  const [userCourses] = getUserCourses();
  const [isConnected] = getNetworkInfo();

  const [shownLatestUpdate, latestUpdate] = getLatestUpdate();

  const firstName = userDetails?.fullName?.split(' ')[0];

  const [isModalVisible, setIsModalVisible] = useState(shownLatestUpdate);
  const [existingArray, setExistingArray] = useState([]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsModalVisible(shownLatestUpdate);
  }, [shownLatestUpdate])

  useEffect(() => {
    (async()=>{
      const existingArrayString = await AsyncStorage.getItem('@attemptedOfflineQuizzes');
      existingArrayString ? setExistingArray(JSON.parse(existingArrayString)) : null ;

      setTimeout(() => {
        InitiateBackUp();
      }, 5000);
    })()
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
      Alert.alert('Something went wrong!')
      console.log('Error getting quiz questions', error);
    }
  }

  const data = {
    title: 'Hello, This is a message',
    message: 'Hello buddy, this is a presaved message',
    links: [
      {
        title: 'Link 1',
        link: 'https://example.com/link1',
      },
      {
        title: 'Link 2',
        link: 'https://example.com/link2',
      },
    ],
  };

  const InitiateBackUp = async () => {
    if (isConnected && existingArray.length > 0) {
      Alert.alert(
        'Attempted Questions',
        'Found locally saved attepted questions, click OK to back them up',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              handleBackUp()
              console.log('User confirmed');
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleBackUp = async () => {
    try {
      existingArray.map(async(questionDetails)=>{
        await axios.post(`${serverUrl}/api/testing_route/user/save_attempted_questions`, questionDetails);
      })
    } catch (error) {
      console.log('Error getting quiz questions', error);
    }
  }

  return (
    <SafeAreaView className='p-5'>
      <View className="bg-purple-700 rounded-lg p-5 h-64 flex flex-row justify-between">
        <Image source={require('../../assets/logo.png')} className="w-20 h-20 opacity-40 rounded-lg" />
        <View className="justify-end">
          <Text className="text-white">Welcome, {firstName}</Text>
          <Text className="text-white">Level: {userDetails?.level}</Text>
          <Text className="text-white">Department: {userDetails?.department?.toUpperCase()}</Text>
        </View>
      </View>
      <View>
        <Text className='my-3 font-bold'>Top Courses</Text>
        <View className='flex flex-row flex-wrap'>
          {userCourses.slice(0, 3).map((course) => (
            <Pressable onPress={() => getQuizQuestions(course)} className='w-1/3 p-2'>
              <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
              <Text className='text-center'>{courseCodes[course.courseCode]}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View className='flex-1 justify-center items-center'>
          <View className='bg-white p-8 rounded-lg items-center shadow-xl'>
            <Text className='text-xl font-bold mb-4'>{latestUpdate.title}</Text>
            <Text className='mb-4'>{latestUpdate.message}</Text>

            {latestUpdate?.links?.map((link, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log('Opening link:', link.link);
                }}
              >
                <Text className='text-blue-500 underline mb-4'>{link.title}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={closeModal}>
              <Text className='text-red-500 font-bold mt-4'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Dashboard

