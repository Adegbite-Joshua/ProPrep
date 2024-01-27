import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigations from './navigations/Naivgations';
import Landing from './screens/Landing';

export default function App() {
  return (
    <Navigations />
    // <SafeAreaView className='bg-red-400 flex h-full'>
    //     <Text className='text-center text-3xl font-bold text-red-500'>Pro Prep</Text>
    // </SafeAreaView>
  );
}
