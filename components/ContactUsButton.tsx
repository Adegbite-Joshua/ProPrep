import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsButton = ({navigation}) => {
  // const  = useNavigation();
  const lastPosition = useRef({ x: 0, y: 0 });

  const useDraggableIcon = () => {
    const position = new Animated.ValueXY(lastPosition.current);
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
          position.setValue({ x: gesture.dx + lastPosition.current.x, y: gesture.dy + lastPosition.current.y });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (isDragging) {
          lastPosition.current = { x: gesture.dx + lastPosition.current.x, y: gesture.dy + lastPosition.current.y };
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
        backgroundColor: 'purple',
        zIndex: 99999999
      }}
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
