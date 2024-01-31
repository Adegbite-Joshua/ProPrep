import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';


const LevelSelection = ({text}) => {

  return (
    <View className=' absolute z-50 h-full w-full items-center justify-center bg-gray-400 opacity-50 flex flex-row'>
        <ActivityIndicator size={40}/>
        <Text>{text}</Text>
    </View>
  );
};

export default LevelSelection;
