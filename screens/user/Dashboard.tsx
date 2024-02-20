import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { Fragment, useLayoutEffect, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserDetails } from '../../redux/userDetails';
import { userDetailsTypes } from '../../types/userDetails';
import { courseCodes } from '../../constants/constants';
import getUserDetails from '../../customHooks/getUserDetails';



const Dashboard = ({navigation}) => {
  const [userDetails] = getUserDetails();

  let users = useSelector((state: any)=>state.userDetails.details);
  // console.log(localUserDetails);
  

  const firstName = userDetails?.fullName?.split(' ')[0];
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
          <Pressable onPress={()=>navigation.navigate('Test')} className='w-1/3 p-2'>
            <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
            <Text className='text-center'>{courseCodes['mth101']}</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('Test')} className='w-1/3 p-2'>
            <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
            <Text className='text-center'>{courseCodes['gns101']}</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('Test')} className='w-1/3 p-2'>
            <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
            <Text className='text-center'>{courseCodes['mth101']}</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('Test')} className='w-1/3 p-2'>
            <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
            <Text className='text-center'>{courseCodes['mth101']}</Text>
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('Test')} className='w-1/3 p-2'>
            <Image source={require('../../assets/logo.png')} className='w-20 h-20 opacity-40 rounded-lg' />
            <Text className='text-center'>{courseCodes['mth101']}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

