import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnswerDisplay = ({ answer }) => (
  <View style={baseStyles.center}>
    <Text style={styles.text}>The answer is:</Text>
    <Text style={styles.answer}>
      <MaterialCommunityIcons
        name="format-quote-open"
        size={20}
        color={colors.black}
      />
      {` ${answer} `}
      <MaterialCommunityIcons
        name="format-quote-close"
        size={20}
        color={colors.black}
      />
    </Text>
    <Text style={styles.text}>Did you guess it right?</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 25,
    ...baseStyles.textCenter
  },
  answer: {
    ...baseStyles.textCenter,
    color: colors.black,
    backgroundColor: colors.mercury,
    fontSize: 20,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    maxWidth: 300
  }
});

export default AnswerDisplay;