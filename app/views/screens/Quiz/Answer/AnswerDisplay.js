import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import baseStyles, { colors } from '../../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { string } from 'prop-types';

const AnswerDisplay = ({ answer }) => (
  <View style={styles.center}>
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

AnswerDisplay.propTypes = {
  answer: string.isRequired
};

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
  },
  center: {
    flex: 1,
    ...baseStyles.center
  }
});

export default AnswerDisplay;
