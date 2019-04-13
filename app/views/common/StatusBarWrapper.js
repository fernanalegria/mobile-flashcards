import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { colors } from '../styles';
import { string } from 'prop-types';

/**
 * Wrapper for React Native's StatusBar component
 */
const StatusBarWrapper = ({ backgroundColor = colors.black, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

StatusBarWrapper.propTypes = {
  backgroundColor: string
};

export default StatusBarWrapper;
