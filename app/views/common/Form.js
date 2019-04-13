import React from 'react';
import { View, StyleSheet } from 'react-native';
import baseStyles from '../styles';

const Form = ({ children }) => (
  <View style={baseStyles.center}>
    <View style={styles.form}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  form: {
    width: 280,
    ...baseStyles.stretch
  }
});

export default Form;
