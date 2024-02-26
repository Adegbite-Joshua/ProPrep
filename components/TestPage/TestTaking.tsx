import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import getNetworkInfo from '../../customHooks/getNetworkInfo';
import getUserDetails from '../../customHooks/getUserDetails';
import axios from 'axios';
import { courseCodes, serverUrl } from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



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

const TestTaking = ({ navigation, questionDetails, courseCode }) => {
  const [isConnected] = getNetworkInfo();
  const [userDetails] = getUserDetails();
  console.log(courseCode);
  

  const { questions, startingTime } = questionDetails;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitModalVisible, setSubmitModalVisible] = useState(false);
  const [newQuestions, setNewQuestions] = useState<Question[]>(questions);

  const quizDuration = 15 * 60;
  const [timeRemaining, setTimeRemaining] = useState(quizDuration);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, Math.floor((startingTime + quizDuration * 1000 - currentTime) / 1000));
      setTimeRemaining(remainingTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startingTime]);

  useEffect(() => {
    if (timeRemaining === 0) {
      submitTest();
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleOptionSelect = (option: string) => {
    const updatedQuestions = [...newQuestions];
    const currentQuestion = updatedQuestions[currentQuestionIndex] as OptionsQuestion;
    currentQuestion.selectedAnswer = option;
    setNewQuestions(updatedQuestions);
  };

  const handleStructuralAnswerChange = (answer: string) => {
    const updatedQuestions = [...newQuestions];
    const currentQuestion = updatedQuestions[currentQuestionIndex] as (StructuralQuestion & { selectedAnswer?: string });
    currentQuestion.userAnswer = answer;
    setNewQuestions(updatedQuestions);
  };

  const submitTest = async () => {
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

    try {
      if (isConnected) {
        let reqBody = {
          userId: userDetails?._id,
          newQuestion: {
            courseCode,
            questions: newQuestions,
            score: totalScore,
            date: new Date(),
          }
        };
        const getQuestions: any = await axios.post(`${serverUrl}/api/testing_route/user/save_attempted_questions`, reqBody);
      } else {
        const existingArrayString = await AsyncStorage.getItem('@attemptedOfflineQuizzes');
        const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

        existingArray.push({
          userId: userDetails?._id,
          newQuestion: {
            courseCode,
            questions: newQuestions,
            score: totalScore,
            date: new Date(),
          },
        });
        await AsyncStorage.setItem('@attemptedOfflineQuizzes', JSON.stringify(existingArray));
        Toast.show({
          type: 'warning',
          text1: 'Quiz Sync',
          text2: 'Quiz questions saved offline, you can synchronize it later'
        })
      }


    } catch (error) {
      console.log('Error getting quiz questions', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView className="flex-1 p-5">
      <Toast autoHide visibilityTime={3000} position='top' />
      <Text className=' text-2xl'>{courseCodes[courseCode]}</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time Remaining: {formatTime(timeRemaining)}</Text>
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
            <Text className="text-2xl mb-4 text-center underline">Test Submitted!</Text>
            <Text className="text-5xl mb-4 text-center">Score: {score} / {questions.length}</Text>
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
