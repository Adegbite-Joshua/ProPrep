import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(216 180 254)',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  textRed: {
    color: 'red',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'rgb(216 180 254)',
    borderRadius: 4,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  selectedClass: {
    marginTop: 20,
    fontSize: 18,
  },
});

const DepartmentSelection = ({ onValueChange }) => {

  const [items, setItems] = useState([
    {value: 'Science', key: 'science'},
    {value: 'Commercial', key: 'commercial'},
    {value: 'Art', key: 'art'},
  ]);

  return (
    <View style={styles.container}>
      <Text className='self-start'>Select Department:</Text>
      <SelectList 
        boxStyles={styles.input}
        setSelected={onValueChange}
        data={items}
        search={false}
        defaultOption={{value: 'Science', key: 'science'}}
        placeholder='Select Level'/>
    </View>
  );
};

export default DepartmentSelection;
