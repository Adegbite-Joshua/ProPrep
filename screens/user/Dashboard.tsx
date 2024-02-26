import { View, Text, SafeAreaView, Image, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { courseCodes } from '../../constants/constants';
import getUserDetails from '../../customHooks/getUserDetails';
import getUserCourses from '../../customHooks/getUserCourses';
import getLatestUpdate from '../../customHooks/getLatestUpdate';



const Dashboard = ({ navigation }) => {
  const [userDetails] = getUserDetails();
  const [userCourses] = getUserCourses();
  const [shownLatestUpdate, latestUpdate] = getLatestUpdate();
  console.log(userDetails);
  console.log(shownLatestUpdate, latestUpdate);
  
  const firstName = userDetails?.fullName?.split(' ')[0];

  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
 
  // const getQuizQuestions = async (courseCode) => {
    
  //   try {
  //     const numberOfQuestions = Number(await AsyncStorage.getItem('@questionsNumberValue')) || 15;

  //     if (!isConnected) {
  //       const allCoursesQuestions = JSON.parse(await AsyncStorage.getItem('@allCoursesQuestions'));
  //       const quizQuestions = allCoursesQuestions[userDetails?.semester][courseCode];
        
  //       navigation.navigate('Test', { questionDetails: { questions: getRandomQuestions(quizQuestions, numberOfQuestions), startingTime: Date.now() } });
  //       return;
  //     }
  //     let reqBody = {
  //       level: userDetails?.level,
  //       department: userDetails?.department,
  //       semester: userDetails?.semester,
  //       courseCode,
  //       numberOfQuestions
  //     };
  //     console.log(reqBody);
  //     const getQuestions: any = await axios.post(`${serverUrl}/api/testing_route/question/get_questions`, reqBody);
  //     if (getQuestions.status == 200) {
  //       navigation.navigate('Test', { questionDetails: getQuestions.data });        
  //     }
  //   } catch (error) {
  //     console.log('Error getting quiz questions', error);
  //   }
  // }

  return (
    <SafeAreaView className='p-5'>
      <View className="bg-purple-700 rounded-lg p-5 h-64 flex flex-row justify-between">
        <Image source={require('../../assets/logo.png')} className="w-20 h-20 opacity-40 rounded-lg" />
        <View className="justify-end">
          <Text className="text-white">Welcome, {firstName}</Text>
          <Text className="text-white">Level: {userDetails?.level}</Text>
          <Text className="text-white">Department: {userDetails?.department}</Text>
        </View>
      </View>
      <View>
        <Text className='my-3 font-bold'>Top Courses</Text>
        <View className='flex flex-row flex-wrap'>
          {userCourses.slice(0, 3).map((course) => (
            <Pressable onPress={() => navigation.navigate('Test')} className='w-1/3 p-2'>
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
            <Text className='text-xl font-bold mb-4'>{data.title}</Text>
            <Text className='mb-4'>{data.message}</Text>

            {data.links.map((link, index) => (
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

