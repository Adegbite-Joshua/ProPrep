import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Define your component props
interface MySelectProps {
  onSelectOption: (selectedOption: string) => void;
}

const MySelect: React.FC<MySelectProps> = ({ onSelectOption }) => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  return (
    <View style={styles.container}>
      {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue as string);
          onSelectOption(itemValue as string);
        }}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
        <Picker.Item label="Option 4" value="option4" />
      </Picker> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
