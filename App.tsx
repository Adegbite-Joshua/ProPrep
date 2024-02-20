import { StatusBar } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import Navigations from './navigations/Naivgations';
import { store } from './redux/store';
// import { ToastContainer } from 'react-native-toastify';
// import 'react-native-toastify/dist/ReactNativeToastify.css';
// import { ToastProvider } from 'react-native-toast-message';


export default function App() {
  
  return (
    <Provider store={store}>
      {/* <ToastContainer position='top' className='top-2 right-2' /> */}
        <Navigations />
    </Provider>
  );
}
