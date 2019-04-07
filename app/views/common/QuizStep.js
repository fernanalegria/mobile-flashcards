import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../styles';

const QuizStep = ({ current, total }) => (
  <Text style={styles.step}>{`${current}/${total}`}</Text>
);

const styles = StyleSheet.create({
  step: {
    color: colors.purple,
    fontSize: 25,
    padding: 10
  }
});

export default QuizStep;
