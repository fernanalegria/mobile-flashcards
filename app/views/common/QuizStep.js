import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../styles';
import { number } from 'prop-types';

const QuizStep = ({ current, total }) => (
  <Text style={styles.step}>{`${current}/${total}`}</Text>
);

QuizStep.propTypes = {
  current: number.isRequired,
  total: number.isRequired
};

const styles = StyleSheet.create({
  step: {
    color: colors.blueWood,
    fontSize: 25,
    padding: 10
  }
});

export default QuizStep;
