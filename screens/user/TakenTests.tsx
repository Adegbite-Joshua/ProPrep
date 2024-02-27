import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import getAttemptedQuestions from '../../customHooks/getAttemptedQuestions';
import { courseCodes, serverUrl } from '../../constants/constants';


// const takenQuizes = [
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   {
//     courseName: 1,
//     questions: [{}],
//     score: 12,
//     date: 'uieiwjhsh', // Replace with a valid date string
//   },
//   // Add more taken quizzes as needed
// ];

const TakenTests = ({ navigation, route }) => {
  const [takenQuizes, setTakenQuizes] = useState([]);

  const { fetchAttemptedQuestions, attemptedQuestions } = getAttemptedQuestions();  
  
  useEffect(()=>{
    if(!attemptedQuestions || attemptedQuestions.length == 0){
      navigation.navigate('Courses');
      return;
    }
    setTakenQuizes(attemptedQuestions)
  }, [attemptedQuestions])

  return (
    <SafeAreaView className='flex-1 p-5'>
      <Text className='text-2xl font-bold mb-4'>Taken Tests</Text>
      <FlatList
        data={takenQuizes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item , index}) => (
          <TouchableOpacity onPress={()=>navigation.navigate('ReviewTest', {questionDetails: item})} className='border p-2 mb-2 rounded'>
            <Text className='text-base mb-2'>
              Course: {courseCodes[item.courseCode]}
            </Text>
            <Text className='text-base mb-2'>Score: {item.score}</Text>
            <Text className='text-base mb-2'>
              Date: {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default TakenTests;
