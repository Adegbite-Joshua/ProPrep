import { Button } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import NativeStacks from './NativeStacks';

const Drawer = createDrawerNavigator();

const DrawerTab = ({navigation}) => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='NativeStacks' component={NativeStacks} options={{drawerLabel: 'Dashboard'}} />
        <Button title='Update Offline Questions' onPress={()=>console.log('Update clicked')} />        
    </Drawer.Navigator>
  )
}

export default DrawerTab;