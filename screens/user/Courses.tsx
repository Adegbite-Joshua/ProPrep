import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

const Courses = ({navigation}) => {
  
  const subjects = [
    { code: 'MTH101', color: 'bg-blue-500', buttonText: 'Take Test' },
    { code: 'ENG202', color: 'bg-green-500', buttonText: 'Take Test' },
    { code: 'PHY303', color: 'bg-yellow-500', buttonText: 'Take Test' },
    { code: 'CHE404', color: 'bg-red-500', buttonText: 'Take Test' },
  ];

  return (
    <SafeAreaView className='flex-1'>
      <View className='p-4'>
        {subjects.map((subject, index) => (
          <View key={index} className='flex-row items-center border-b-2  border-gray-400 justify-between mb-4 rounded p-4'>
            <Text className='mr-2 '>{subject.code}</Text>
            <View className='flex flex-row gap-2'>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => navigation.navigate('Test')}
              >
                <Text className=''>Take Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='border-2 border-purple-500 bg-transparent rounded-md p-2 ms-auto'
                onPress={() => navigation.navigate('TakenTest')}
              >
                <Text className=''>Previous Quizes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Courses;
