import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Navigations from './navigations/Naivgations';
import { store } from './redux/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { Text, View } from 'react-native';

// const toastConfig = {
//   success: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: 'pink' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: '400'
//       }}
//     />
//   ),
//   /*
//     Overwrite 'error' type,
//     by modifying the existing `ErrorToast` component
//   */
//   error: (props) => (
//     <ErrorToast
//       {...props}
//       contentContainerStyle={{ paddingHorizontal: 15, opacity: 1 }}
//       text1Style={{
//         fontSize: 17
//       }}
//       text2Style={{
//         fontSize: 15
//       }}
//     />
//   ),
// };

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // if (isLoading) {
  //   return (  <LottieView
  //     source={require('./lottie/splash.json')}
  //     autoPlay
  //     loop={false}
  //     resizeMode="cover"
  //     onAnimationFinish={() => {
  //       setIsLoading(false);
  //     }}
  //   />)
  // }
  
  return (

    <Provider store={store}>
      <StatusBar style='inverted'/>
      {/* <Toast visibilityTime={3000} position='top' config={toastConfig} /> */}
      <Navigations />
    </Provider>
  );
}
