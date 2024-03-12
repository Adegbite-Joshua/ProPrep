import { View, Text, SafeAreaView, BackHandler, AppState, Alert } from 'react-native'
import React from 'react'
import TestTaking from '../../components/TestPage/TestTaking'


const TestPage = ({navigation, route}) => {  
  const { courseCode, questionDetails } = route.params;
    
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      gestureEnabled: false,
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      }
    );

    // const handleAppStateChange = (nextAppState) => {
    //   if (nextAppState === 'inactive' || nextAppState === 'background') {

    //     Alert.alert(
    //       'Warning',
    //       'Minimizing the app is not allowed in this mode.',
    //       [
    //         {
    //           text: 'OK',
    //           onPress: () => {
    //             AppState.currentState = 'active';
    //           },
    //         },
    //       ],
    //       { cancelable: false }
    //     );
    //   }
    // };

    // AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // (AppState as any)?.removeEventListener('change', handleAppStateChange);
      backHandler.remove();
    };

  }, [navigation]);

  return (
    <SafeAreaView className='flex-1'>
      <TestTaking navigation={navigation} courseCode={courseCode} questionDetails={questionDetails} />      
    </SafeAreaView>
  )
}

export default TestPage