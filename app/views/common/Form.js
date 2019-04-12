import React from 'react';
import { View, StyleSheet } from 'react-native';

const Form = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.form}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  form: {
    width: 280,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Form;
