import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';

const takenQuizes = [
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  {
    courseName: 1,
    questions: [{}],
    score: 12,
    date: 'uieiwjhsh', // Replace with a valid date string
  },
  // Add more taken quizzes as needed
];

const TakenTests = () => {
  return (
    <SafeAreaView className='flex-1 p-5'>
      <Text className='text-2xl font-bold mb-4'>Taken Tests</Text>

      <FlatList
        data={takenQuizes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className='border p-2 mb-2 rounded'>
            <Text className='text-base mb-2'>
              Course: {item.courseName}
            </Text>
            <Text className='text-base mb-2'>Score: {item.score}</Text>
            <Text className='text-base mb-2'>
              Date: {item.date}
            </Text>
            {/* Additional details or actions related to the taken quiz */}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TakenTests;
