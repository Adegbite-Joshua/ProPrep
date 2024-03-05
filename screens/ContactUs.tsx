import { AntDesign } from '@expo/vector-icons';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import Input from '../components/Forms/Input';

const ContactUsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !message) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        Alert.alert('Submitted', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (<AntDesign onPress={() => navigation.goBack()} className='me-auto' name="arrowleft" size={24} color="black" />)
        })
    }, [])
    return (
        <View className='flex-1 p-4'>
            <Input
                label='Full Name'
                error={null}
                value={name}
                // keyboardType="text"
                placeholder="Your Name"
                password={false}
                iconName='address-book-o'
                className='px-1'
                onFocus={() => console.log()}
                onChangeText={(text: string) => setName(text)}
            />
            <Input
                label='Email'
                error={null}
                placeholder="Your Email"

                keyboardType="email-address"
                value={email}
                password={false}
                iconName='envelope-o'
                className='px-1'
                onFocus={() => console.log()}
                onChangeText={(text: string) => setEmail(text)}
            />

            <TextInput
                className='h-32 border-2 border-purple-300 my-4 rounded-md px-2'
                placeholder="Your Message"
                value={message}
                onChangeText={(text) => setMessage(text)}
                multiline
            />
            <TouchableOpacity className='bg-purple-500 p-3 rounded-md mt-24' onPress={handleSubmit}>
                <Text className='text-white text-center'>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ContactUsScreen;
