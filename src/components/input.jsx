import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function Input({
  placeholder,
  customStyles,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  multiline,
  value,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 25,
  },
});
