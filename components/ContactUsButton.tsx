import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsButton = ({navigation}) => {
//   const  = useNavigation();

  const useDraggableIcon = () => {
    const position = new Animated.ValueXY({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(false);
      },
      onPanResponderMove: (_, gesture) => {
        if (!isDragging) {
          setIsDragging(true);
        }
        if (isDragging) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (isDragging) {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        } else {
          // Only navigate if it was a tap (not a drag)
          navigation.navigate('Contact Us');
        }
        setIsDragging(false);
      },
    });

    return { position, panResponder };
  };

  const { position, panResponder } = useDraggableIcon();

  return (
    <Animated.View
      style={{
        transform: [{ translateX: position.x }, { translateY: position.y }],
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 25,
        padding: 10,
        elevation: 5,
      }}
      className='bg-purple-500'
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Contact Us')}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ContactUsButton;
