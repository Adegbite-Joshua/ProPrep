import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Fontisto } from '@expo/vector-icons';

const Input = ({
    label, 
    error,
    
    }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
  return (
    <View>
      <Text>{label}</Text>
      <View className={`h-12 bg-gray-300 flex flex-row border-2 items-center p-1 ${error ? 'border-red-500' : isFocused ? 'border-blue-400' : 'border-gray-400'}`}>
        <Fontisto name="email" size={24} color="black" />
        <TextInput
            autoCorrect={false}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)} />
      </View>
      {error && <Text className='text-red-500'>{error}</Text>}
    </View>
  )
}

export default Input