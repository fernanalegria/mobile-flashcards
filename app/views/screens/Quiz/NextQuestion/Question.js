import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { QuizStep, Form, Button } from '../../../common';
import baseStyles from '../../../styles';
import { Ionicons } from '@expo/vector-icons';
import { PLATFORM } from '../../../utils/constants';

const Question = ({ question, current, total, showAnswer }) => {
  const { fontSize, color } = baseStyles.buttonContent;
  return (
    <View style={{ flex: 1 }}>
      <QuizStep current={current} total={total} />
      <View style={baseStyles.container}>
        <Text style={styles.title}>{question}</Text>
        <Form>
          <Button
            text="Show Answer"
            icon={
              <Ionicons
                name={Platform.select({
                  [PLATFORM.iOS]: 'ios-eye',
                  [PLATFORM.Android]: 'md-eye'
                })}
                size={fontSize}
                color={color}
              />
            }
            style={{ margin: 25 }}
            onPress={showAnswer}
          />
        </Form>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...baseStyles.title,
    padding: 25
  }
});

export default Question;
