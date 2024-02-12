import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { Fragment, useLayoutEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserDetails } from '../../redux/userDetails';
import { userDetailsTypes } from '../../types/userDetails';



const Dashboard = () => {
  // const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<userDetailsTypes>({})


  useLayoutEffect(() => {
    (async () => {
      const localUserDetails = JSON.parse(await AsyncStorage.getItem('@user'));
      if (localUserDetails) {
          // dispatch(setUserDetails(localUserDetails));
          setUserDetails(localUserDetails);
      }      
    })();

  }, [])

  const firstName = userDetails?.fullName.split(' ')[0];
  return (
    <SafeAreaView className='p-5'>
      <View className="bg-purple-700 rounded-lg p-5 h-64 flex flex-row justify-between">
        <Image source={require('../../assets/google-icon.png')} className="w-24 h-24 rounded-lg" />
        <View className="justify-end">
          <Text className="text-white">Welcome, {firstName}</Text>
          <Text className="text-white">Level: {userDetails?.level}</Text>
          <Text className="text-white">Department: {userDetails?.department}</Text>
        </View>
      </View>
      <View>
        <Text className='my-3 font-bold'>Top Courses</Text>
        <View className='flex flex-row flex-wrap'>
          <Pressable className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </Pressable>
          <Pressable className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </Pressable>
          <Pressable className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </Pressable>
          <Pressable className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </Pressable>
          <Pressable className='w-1/3 p-2'>
            <Image source={require('../../assets/google-icon.png')} className='w-24 h-24 rounded-lg' />
            <Text className='text-center'>MTH101</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

