import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import baseStyles, { colors } from '../../styles';
import { ROUTES } from '../../utils/constants';
import { getNumberOfCards } from '../../utils/helpers';

const DeckListItem = ({ deck, navigation }) => (
  <View style={styles.item}>
    {deck ? (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTES.DeckDetail, {
            id: deck.id,
            title: deck.title
          });
        }}
      >
        <View style={styles.deckCard}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cards}>{getNumberOfCards(deck.cards)}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <Text style={baseStyles.noDataText}>No data found</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  item: {
    ...baseStyles.card,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 9,
    marginBottom: 9
  },
  title: {
    ...baseStyles.textCenter,
    fontSize: 20,
    color: colors.black
  },
  cards: {
    ...baseStyles.textCenter,
    fontSize: 16,
    color: colors.boulder
  },
  deckCard: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 20
  }
});

export default DeckListItem;
