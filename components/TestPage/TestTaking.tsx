import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';


type OptionsQuestion = {
  type: 'options';
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string;
};

type StructuralQuestion = {
  type: 'structural';
  question: string;
  correctAnswer: string;
  userAnswer?: string;
};

type Question = OptionsQuestion | (StructuralQuestion & { selectedAnswer?: string, userAnswer?: string, });

const TestTaking = ({ navigation }) => {
  // const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      "type": "options",
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris"
    },
    {
      "type": "options",
      "question": "2 + 2 equals?",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": "4"
    },
    {
      "type": "structural",
      "question": "Who wrote Romeo and Juliet?",
      "correctAnswer": "William Shakespeare"
    },
    {
      "type": "structural",
      "question": "Explain the process of photosynthesis.",
      "correctAnswer": "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigment."
    },
    {
      "type": "options",
      "question": "What is the capital of Spain?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Madrid"
    },
    {
      "type": "options",
      "question": "Who is known as the 'Father of Computer Science'?",
      "options": ["Alan Turing", "Bill Gates", "Ada Lovelace", "Charles Babbage"],
      "correctAnswer": "Alan Turing"
    },
    {
      "type": "options",
      "question": "What is the largest planet in our solar system?",
      "options": ["Earth", "Mars", "Jupiter", "Saturn"],
      "correctAnswer": "Jupiter"
    },
    {
      "type": "options",
      "question": "Which element has the chemical symbol 'O'?",
      "options": ["Oxygen", "Gold", "Iron", "Silver"],
      "correctAnswer": "Oxygen"
    },
    {
      "type": "options",
      "question": "Who wrote 'To Kill a Mockingbird'?",
      "options": ["J.K. Rowling", "Harper Lee", "George Orwell", "Ernest Hemingway"],
      "correctAnswer": "Harper Lee"
    },
    {
      "type": "options",
      "question": "What is the capital of Australia?",
      "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      "correctAnswer": "Canberra"
    },
    {
      "type": "options",
      "question": "What is the formula for water?",
      "options": ["H2O", "CO2", "O2", "NaCl"],
      "correctAnswer": "H2O"
    },
    {
      "type": "options",
      "question": "Who discovered penicillin?",
      "options": ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Thomas Edison"],
      "correctAnswer": "Alexander Fleming"
    },
    {
      "type": "options",
      "question": "What is the capital of China?",
      "options": ["Beijing", "Shanghai", "Tokyo", "Seoul"],
      "correctAnswer": "Beijing"
    },
    {
      "type": "options",
      "question": "Which planet is known as the 'Red Planet'?",
      "options": ["Mars", "Venus", "Mercury", "Jupiter"],
      "correctAnswer": "Mars"
    }
    // Add more questions as needed
  ]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      submitTest();
    }
  }, [timeRemaining]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionSelect = (option: string) => {
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex] as OptionsQuestion;
    currentQuestion.selectedAnswer = option;
    setQuestions(updatedQuestions);
  };

  const handleStructuralAnswerChange = (answer: string) => {
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex] as (StructuralQuestion & { selectedAnswer?: string });
    currentQuestion.userAnswer = answer;
    setQuestions(updatedQuestions);
  };

  const submitTest = () => {
    let totalScore = 0;

    questions.forEach((question) => {
      if (question.type === 'options' && question.selectedAnswer === question.correctAnswer) {
        totalScore += 1;
      } else if (question.type === 'structural' && question.userAnswer === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setSubmitModalVisible(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView className="flex-1 p-5">
      <Text className=' text-2xl '>MTH 101</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}</Text>
      </View>
      <View className='flex flex-row flex-wrap justify-start gap-x-1 mb-4'>
        {questions.map((question, index) => {
          const isCurrent = currentQuestionIndex === index;
          const isAnswered = question.type === 'options' ? question.selectedAnswer !== undefined : question.userAnswer !== undefined || question.userAnswer === '';

          const buttonStyle = `w-1/12 bg-blue-500 rounded-md h-5 mb-4 ${isCurrent ? 'bg-blue-700' : ''} ${isAnswered ? 'bg-purple-500' : ''} ${!isAnswered && !isCurrent ? 'bg-red-500' : ''}`;

          return (
            <Pressable
              key={index}
              className={buttonStyle}
              onPress={() => setCurrentQuestionIndex(index)}
            >
              <Text className='text-white text-center'>{index + 1}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView className="flex-1 w-full mb-8">
        <View className="mb-20">
          <Text className="text-lg mb-2 text-center">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text className="text-base mb-4">{currentQuestion.question}</Text>
          {currentQuestion.type === 'options' ? (
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
                className='flex flex-row justify-between rounded-md py-2'
                style={[
                  { marginBottom: 2, padding: 4, },
                  currentQuestion.selectedAnswer === option && { borderColor: 'purple', borderWidth: 1, },
                ]}
              >
                <Text>{`${index + 1}.   ${option}`}</Text>
                {currentQuestion.selectedAnswer === option ? <Ionicons name="checkmark-sharp" size={24} color="green" /> : null}
              </TouchableOpacity>
            ))
          ) : (
            <TextInput
              className="border-gray-500 border-b-2 mb-10 px-3 py-2 rounded-5"
              placeholder="Your answer..."
              autoFocus
              onChangeText={(text) => handleStructuralAnswerChange(text)}
              value={currentQuestion.userAnswer || ''}
            />
          )}
        </View>
      </ScrollView>
      <View className="flex-row justify-between w-full p-4">
        {currentQuestionIndex > 0 && (
          <Button title="Previous" onPress={() => setCurrentQuestionIndex((prevIndex) => prevIndex - 1)} />
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <Button title="Next" onPress={handleNextQuestion} />
        ) : (
          <Button title="Submit" onPress={submitTest} />
        )}
      </View>
      {score > 0 && (
        <Text className="text-center text-lg mt-4">Score: {score} / {questions.length}</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSubmitModalVisible}
        onRequestClose={() => {
          setSubmitModalVisible(!isSubmitModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center p-3">
          <View className="bg-white w-full p-2 rounded-lg shadow-lg relative h-96">
            <Text className="text-2xl mb-4">Test Submitted!</Text>
            <Text className="text-lg mb-4">Score: {score} / {questions.length}</Text>
            <LottieView
              source={require('../../lottie/fireworks.json')}
              autoPlay
              loop={false}
              style={{ width: 300, height: 300, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
            />
            <View className='mt-auto mx-auto flex flex-row'>
              <Pressable className=' bg-blue-500 mx-2 p-3 rounded-md' onPress={() => {
                setSubmitModalVisible(!isSubmitModalVisible);
                navigation.navigate('BottomTabs', { screen: 'Courses' });
              }}>
                <Text className='text-white'>Close</Text>
              </Pressable>
              <Pressable className=' bg-blue-500 mx-2 p-3 rounded-md' onPress={() => {
                setSubmitModalVisible(!isSubmitModalVisible);
                navigation.navigate('ReviewTest');
              }}>
                <Text className='text-white'>Review</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
  },
});

export default TestTaking;
