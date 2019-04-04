import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

const StatusBarWrapper = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default StatusBarWrapper;
