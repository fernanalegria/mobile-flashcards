import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import baseStyles, { colors } from '../../styles';
import { PLATFORM, ROUTES } from '../../utils/constants';

const DeckListItem = ({ deck, navigation }) => (
  <View style={styles.item}>
    {deck ? (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTES.DeckDetail, { id: deck.id, title: deck.title });
        }}
      >
        <View style={styles.deckCard}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cards}>{deck.cards.length} cards</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <Text style={baseStyles.noDataText}>No data found</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderRadius: Platform.OS === PLATFORM.iOS ? 16 : 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 9,
    marginBottom: 9,
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: colors.blackShadow,
    shadowOffset: {
      width: 0,
      height: 3
    }
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
