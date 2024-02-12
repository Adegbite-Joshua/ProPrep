import React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Landing = ({navigation}) => {
  return (
    <SafeAreaView className='bg-purple-500 h-full pb-5'>
        <View className='flex gap-y-12 py-24'>
          <Image source={require('../assets/logo.png')} className=' w-44 h-44 mx-auto' />
          <Text className='text-center text-5xl font-bold text-white'>Pro Prep</Text>
          <Text className='text-center text-white'>A cbt quiz app</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('CreateAccount')} className='w-3/6 flex justify-center items-center mx-auto mt-auto mb-10' >
          <Text className='bg-white p-3 text-xl rounded-lg text-purple-600'>Get Started</Text>
        </TouchableOpacity>
        <View>
          <Text className='text-center'>Already have an account? <Text onPress={()=>navigation.navigate('SignIn')} className='text-white'>Sign In</Text></Text>
        </View>
    </SafeAreaView>
  )
}

export default Landing


// {
//   "build": {
//     "preview": {
      
//     },
//     "preview2": {
//       "android": {
//         "gradleCommand": ":app:assembleReleas­e"
//       }
//     },
//     "preview3": {
//       "developmentClient":­ true
//     },
//     "production": {}
//   }
// }