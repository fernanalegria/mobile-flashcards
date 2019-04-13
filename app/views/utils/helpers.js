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

/**
 * Defines general navigation options for the quiz screens
 * @param  {Object} navigation
 * @returns  {Object} navigationOptions
 */
export const setQuizTitle = ({ navigation }) => ({
  title: `${navigation.getParam('deckTitle')} - Quiz`,
  headerRight: (
    <Button
      icon={HomeIcon}
      style={{ marginRight: 10, backgroundColor: colors.transparent }}
      onPress={() => {
        const unsetGoBack = navigation.getParam('unsetGoBack');
        if (unsetGoBack) {
          unsetGoBack(() => {
            navigation.navigate(ROUTES.Home);
          });
        } else {
          navigation.navigate(ROUTES.Home);
        }
      }}
    />
  )
});

/**
 * Returns either card or cards depending on the number
 * @param  {Array} cards
 * @returns  {string}
 */
export const getNumberOfCards = cards =>
  `${cards.length} ${cards.length === 1 ? 'card' : 'cards'}`;
