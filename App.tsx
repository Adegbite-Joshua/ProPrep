import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Navigations from './navigations/Naivgations';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
// import { ToastProvider } from 'react-native-toast-message'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return (  <LottieView
      source={require('./lottie/splash.json')}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={() => {
        setIsLoading(false);
      }}
    />)
  }
  return (

    <Provider store={store}>
      <StatusBar style='auto'/>
      <Toast autoHide visibilityTime={3000} position='top'></Toast>
      <Navigations />
    </Provider>
  );
}
