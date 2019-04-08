import React from 'react';
import { Platform } from 'react-native';
import { Button } from '../common';
import { Ionicons } from '@expo/vector-icons';
import { PLATFORM, ROUTES } from './constants';
import { colors } from '../styles';

const HomeIcon = (
  <Ionicons
    name={Platform.select({
      [PLATFORM.iOS]: 'ios-home',
      [PLATFORM.Android]: 'md-home'
    })}
    size={30}
    color={colors.white}
  />
);

export const setQuizTitle = ({ navigation }) => ({
  title: `${navigation.getParam('deckTitle')} - Quiz`,
  headerRight: (
    <Button
      icon={HomeIcon}
      style={{ marginRight: 10 }}
      onPress={() => {
        navigation.navigate(ROUTES.Home);
      }}
    />
  )
});

export const getNumberOfCards = cards =>
  `${cards.length} ${cards.length === 1 ? 'card' : 'cards'}`;
