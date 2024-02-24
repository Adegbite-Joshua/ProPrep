import { StatusBar } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Navigations from './navigations/Naivgations';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
// import { ToastProvider } from 'react-native-toast-message'

export default function App() {
  
  return (
    <Provider store={store}>
      <StatusBar />
      <Toast autoHide visibilityTime={3000} position='top'  ></Toast>
        <Navigations />
    </Provider>
  );
}
