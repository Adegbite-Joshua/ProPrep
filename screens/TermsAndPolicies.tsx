import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ContactUsButton from '../components/ContactUsButton';


const TermsAndPolicies = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: ()=>(<AntDesign onPress={()=>navigation.goBack()} className='me-auto' name="arrowleft" size={24} color="black" />)
    })
  }, [])

  return (
    <View className='flex-1 p-4'>
      <ScrollView className='mt-4 h-full'>
        <Text className='text-lg'>Welcome to our CBT Quiz App! By using our app, you agree to the following terms and policies:</Text>
        <Text>1. User Details:
          Your user details are securely stored and processed by our app. We prioritize the security and privacy of your information.</Text>

        <Text>2. Quiz Questions:
          The quiz questions are compiled from past questions from universities to provide you with a comprehensive preparation experience. We strive to ensure the accuracy and relevance of the questions.</Text>
        <Text>3. Ads:
          We use advertisements to generate revenue for our app. By using the app, you consent to viewing ads during your quiz sessions. Ad revenue helps us maintain and improve the app for your benefit.</Text>
        <Text className=''>
          4. Data Security:
          We take data security seriously. Our app employs encryption and other security measures to safeguard your personal information. We do not share your data with third parties without your consent.
          </Text>
        <Text className=''>
          5. Usage Guidelines:
          Please use the app responsibly and adhere to ethical practices during quiz sessions. Any misuse or violation of guidelines may result in account suspension.
          </Text>
        <Text className=''>
          6. Updates to Terms:
          These terms and policies may be updated from time to time. It is your responsibility to review them periodically for any changes.
          </Text>
        <Text className=''>
          Please review our complete terms and policies for more detailed information.
          </Text>
        <Text className=''>
          Thank you for using our CBT Quiz App!
        </Text>
      </ScrollView>
      <ContactUsButton navigation={navigation} />
    </View>
  );
};

export default TermsAndPolicies;
