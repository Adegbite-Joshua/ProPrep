import React from 'react';
import { Provider } from 'react-redux';
import Navigations from './navigations/Naivgations';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
// import { ToastProvider } from 'react-native-toast-message'

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style='auto'/>
      <Toast autoHide visibilityTime={3000} position='top'></Toast>
      <Navigations />
    </Provider>
  );
}
