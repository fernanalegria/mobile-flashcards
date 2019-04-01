import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles';

const SubmitButton = ({ onPress, text, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.submitBtn, style]}>
    <Text style={styles.submitBtnText}>{text}</Text>
  </TouchableOpacity>
);

export const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: colors.purple,
    padding: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SubmitButton;
