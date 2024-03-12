import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useColorScheme } from 'react-native'
import NativeStacks from './NativeStacks'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';




const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 15, opacity: 1 }}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

const Navigations = () => {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer
    // s theme={currentTheme == 'dark' ? DarkTheme : DefaultTheme}
     >
        <StatusBar style='dark' />
        <NativeStacks/>
      <Toast visibilityTime={3000} position='top' config={toastConfig} />

    </NavigationContainer>
  )
}

export default Navigations