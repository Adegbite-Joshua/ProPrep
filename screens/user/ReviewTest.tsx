import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, ScrollView, Pressable } from 'react-native';

const questions = [
  {
    id: 1,
    type: 'options',
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    solution: 'Paris is the capital of France, known for its iconic landmarks such as the Eiffel Tower.',
  },
  {
    id: 2,
    type: 'options',
    question: '2 + 2 equals?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    solution: '2 + 2 equals 4.',
  },
  {
    id: 3,
    type: 'structural',
    question: 'Who wrote Romeo and Juliet?',
    solution: 'Romeo and Juliet was written by William Shakespeare.',
  },
  {
    id: 4,
    type: 'structural',
    question: 'Explain the process of photosynthesis.',
    solution: 'Detailed explanation of photosynthesis.',
  },
  {
    id: 5,
    type: 'options',
    question: 'Solve for x: 3x + 2 = 11',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    solution: 'Subtract 2 from both sides, then divide by 3: x = 3.',
  },
  {
    id: 6,
    type: 'options',
    question: 'Solve for x: 3x + 2 = 11',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    solution: 'Subtract 2 from both sides, then divide by 3: x = 3.',
  },
  {
    id: 7,
    type: 'options',
    question: 'Solve for x: 3x + 2 = 11',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    solution: 'Subtract 2 from both sides, then divide by 3: x = 3.',
  },
];

const ReviewTest = ({navigation}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  return (
    <SafeAreaView className='flex-1 p-5'>
      <Text className='text-2xl font-bold mb-4'>Quiz Questions</Text>
      
      <ScrollView>
        {questions.map((question, index) => (
          <TouchableOpacity
            key={question.id}
            onPress={() => handleQuestionClick(question.id)}
            className='border-b border-purple-400 p-2 mb-2 rounded'
          >
            <Text className='text-base mb-2'>{`(${index+1}).    `}{question.question}</Text>
            {question.type === 'options' ? (
              question.options.map((option, index) => (
                <Text
                 key={index}
                 className={`text-base mb-2 p-2 flex flex-row justify-between rounded-md w-full ${option === question.correctAnswer ? 'border border-purple-400' : ''}`}
                >
                    <Text>{option}</Text>
                    {/* {question.correctAnswer === option ? <Ionicons className='float-right' name="checkmark-sharp" size={24} color="green" /> : null} */}
                </Text>
              ))
            ) : null}

            {question.type === 'structural' ? (
              <Text className='text-base mb-2'>
                (Open-ended question - No options)
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pressable className='flex py-2' onPress={()=>navigation.navigate('Courses')}>
        <Text className=' bg-red-400 p-2 text-white text-center'>Close</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedQuestion !== null}
      >
        <View className='flex-1 justify-center items-center p-5'>
          <View className='bg-white p-4 rounded h-3/6'>
            <Text className='text-xl font-bold mb-2'>
              Solution for Question {selectedQuestion}
            </Text>
            <Text className='text-base mb-2'>
              {questions[selectedQuestion - 1]?.solution}
            </Text>
            <TouchableOpacity
              onPress={closeModal}
              className='mt-auto rounded'
            >
              <Text className='bg-red-500 text-white p-2 text-center'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewTest;
