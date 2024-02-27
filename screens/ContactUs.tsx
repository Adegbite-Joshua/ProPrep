// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import tailwind from 'tailwind-rn-classnames';

// const ContactUsScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = () => {
//     if (!name || !email || !message) {
//       // Perform validation if needed
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     Alert.alert('Submitted', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
//   };

//   return (
//     <View style={tailwind('flex-1 p-4 justify-center')}>
//       <Text style={tailwind('text-2xl font-bold mb-4')}>Contact Us</Text>

//       <TextInput
//         style={tailwind('h-10 border border-gray-300 mb-4 px-2')}
//         placeholder="Your Name"
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />

//       <TextInput
//         style={tailwind('h-10 border border-gray-300 mb-4 px-2')}
//         placeholder="Your Email"
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={tailwind('h-20 border border-gray-300 mb-4 px-2')}
//         placeholder="Your Message"
//         value={message}
//         onChangeText={(text) => setMessage(text)}
//         multiline
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default ContactUsScreen;
