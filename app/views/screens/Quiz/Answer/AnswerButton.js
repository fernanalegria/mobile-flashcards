import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../../styles';

const AnswerButton = ({ onPress, text, icon = null }) => (
  <TouchableHighlight
    onPress={onPress}
    style={[styles.container, { backgroundColor: colors.doveGrayShadow }]}
    underlayColor={colors.doveGray}
  >
    <View style={styles.btnContent}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableHighlight>
);

const padding = {
  paddingTop: 15,
  paddingBottom: 15
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    ...padding
  },
  btnContent: {
    flexDirection: 'row',
    ...baseStyles.center,
    ...padding
  },
  text: {
    ...baseStyles.buttonContent,
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default AnswerButton;
