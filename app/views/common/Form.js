import React from 'react';
import { View, StyleSheet } from 'react-native';
import baseStyles from '../styles';
import { node } from 'prop-types';

/**
 * Fixed-width view to contain inputs and buttons
 */
const Form = ({ children }) => (
  <View style={baseStyles.center}>
    <View style={styles.form}>{children}</View>
  </View>
);

Form.propTypes = {
  children: node.isRequired
};

const styles = StyleSheet.create({
  form: {
    width: 280,
    ...baseStyles.stretch
  }
});

export default Form;
