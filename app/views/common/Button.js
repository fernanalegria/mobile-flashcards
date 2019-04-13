import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../styles';
import { func, string, object, bool } from 'prop-types';

/**
 * Reusable button with text and icon
 */
const Button = ({
  onPress,
  text = null,
  style = {},
  icon = null,
  disabled = false
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, style]}
    disabled={disabled}
  >
    {icon}
    {text && <Text style={styles.text}>{text}</Text>}
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: func.isRequired,
  text: string,
  style: object,
  icon: object,
  disabled: bool
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueWood,
    padding: 10,
    height: 45,
    flexDirection: 'row',
    ...baseStyles.center,
    borderRadius: 7
  },
  text: {
    ...baseStyles.buttonContent,
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default Button;
