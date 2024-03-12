import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/user/Settings';
import Dashboard from '../screens/user/Dashboard';
import Courses from '../screens/user/Courses';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  useLayoutEffect(() => {
    const checkAsyncStorageAndNavigate = async () => {
      try {
        const value = await AsyncStorage.getItem('@user');

        if (value == 'null') {
          navigation.navigate('SignIn');
        }
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
      }
    };

    checkAsyncStorageAndNavigate();
  }, [navigation]);
 const checkAsyncStorageAndNavigate = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
  
      if (!value) {
        // Value is falsy, navigate to SignIn page
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      checkAsyncStorageAndNavigate();
    }, [])
  );
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
        tabBarActiveTintColor: 'rgb(168 85 247)',
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