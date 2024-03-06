import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/user/Settings';
import Dashboard from '../screens/user/Dashboard';
import Courses from '../screens/user/Courses';
import { Ionicons } from '@expo/vector-icons';
import React, { useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  // useLayoutEffect(() => {
  //   const checkAsyncStorageAndNavigate = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('@user');

  //       if (!value) {
  //         navigation.navigate('SignIn');
  //       }
  //     } catch (error) {
  //       console.error('Error checking AsyncStorage:', error);
  //     }
  //   };

  //   checkAsyncStorageAndNavigate();
  // }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: 'home' | 'home-outline' | 'settings' | 'ios-settings-sharp' | 'book' | 'book-outline' = 'home';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          }
          if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'ios-settings-sharp';
          }
          return <Ionicons name={iconName} size={size} color={focused ? 'purple' : 'gray'} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray'
      })}
    >
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Courses' component={Courses} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabs;






// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Settings from '../screens/user/Settings';
// import Dashboard from '../screens/user/Dashboard';
// import Courses from '../screens/user/Courses';
// import { Ionicons } from '@expo/vector-icons';
// import React, { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// const BottomTabs = ({navigation}) => {
 
//   useEffect(() => {
//     const checkAsyncStorageAndNavigate = async () => {
//       try {
//         const value = await AsyncStorage.getItem('@user');

//         if (!value) {
         
//           navigation.navigate('SignIn');
//         }
//       } catch (error) {
//         console.error('Error checking AsyncStorage:', error);
//       }
//     };

//     checkAsyncStorageAndNavigate(); // Perform the check when the BottomTabsWrapper component mounts
//   }, [navigation]);
//   return (
//     <Tab.Navigator initialRouteName='Dashboard' screenOptions={({route, navigation})=>({
//       tabBarIcon: ({color, size, focused}) => {
//         let iconName:'home' | 'home-outline'| 'settings' | 'ios-settings-sharp' | 'book' | 'book-outline' = 'home';              
//         if(route.name === 'Dashbaord'){
//           iconName = focused ? 'home' : 'home-outline';
//           color = focused ? 'rgb(168 85 247)' : 'gray';
//         }
//         if(route.name === 'Courses'){
//           iconName = focused ? 'book' : 'book-outline';
//           color = focused ? 'rgb(168 85 247)' : 'gray';
//         }
//         if(route.name === 'Settings'){
//           iconName = focused ? 'settings' : 'ios-settings-sharp';
//           color = focused ? 'rgb(168 85 247)' : 'gray';
//         }

//         return <Ionicons name={iconName} size={size} color={color} />
//       },
//     })}>
//         <Tab.Screen name='Dashboard' component={Dashboard} />
//         <Tab.Screen name='Courses' component={Courses} />
//         <Tab.Screen name='Settings' component={Settings} />
//     </Tab.Navigator>
//   )
// }

// export default BottomTabs