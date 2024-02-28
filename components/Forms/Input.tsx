import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

// interface Props {
//   label: string, 
//     error: string | undefined | null,
//     onChangeText: Dispatch,
//     iconName,
// }

const Input = ({
  label,
  error,
  password,
  iconName,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(password)
  return (
    <View>
      <Text>{label}</Text>
      <View className={`h-12 flex items-center flex-row border-2 p-1 ${error ? 'border-red-500' : isFocused ? 'border-blue-400' : 'border-purple-400'}`}>
        <FontAwesome name={iconName} size={24} className='text-blue-400' />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            secureTextEntry={showPassword}
            autoCorrect={false}
            onFocus={() => {
              setIsFocused(true)
              onFocus()
            }}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </View>
        {password && <FontAwesome onPress={()=>setShowPassword(!showPassword)} name={showPassword ? 'eye' : 'eye-slash'} size={24} className='text-blue-400' />}
      </View>
      {error && <Text className='text-red-500'>{error}</Text>}
    </View>

  )
}

export default Input