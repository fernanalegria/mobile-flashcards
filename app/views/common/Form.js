import React from 'react';
import { View, StyleSheet } from 'react-native';

const Form = ({ children }) => <View style={styles.form}>{children}</View>;

const styles = StyleSheet.create({
  form: {
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

export default Form;
