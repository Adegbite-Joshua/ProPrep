import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    // backgroundColor: 'rgb(216 180 254)',
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

const LevelSelection = ({ onValueChange }) => {

  const [items, setItems] = useState([
    {value: '100 Level', key: '100'},
    {value: '200 Level', key: '200', disabled: true},
    {value: '300 Level', key: '300', disabled: true},
    {value: '400 Level', key: '400', disabled: true},
    {value: '500 Level', key: '500', disabled: true},
  ]);

  return (
    <View style={styles.container}>
      <Text className='self-start'>Select Level:</Text>
      <SelectList 
        boxStyles={styles.input}
        setSelected={onValueChange}
        search={false}
        data={items}
        defaultOption={{value: '100 Level', key: '100'}}
        placeholder='Select Level'/>
    </View>
  );
};

export default LevelSelection;
