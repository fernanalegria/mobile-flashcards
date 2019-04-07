import React from 'react';
import { View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createReduxStore } from './app/state/store';
import { colors } from './app/views/styles';
import { PLATFORM } from './app/views/utils/constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import StatusBarWrapper from './app/views/common/StatusBarWrapper';
import {
  DeckList,
  NewDeck,
  DeckDetail,
  NewCard,
  QuizAnswer,
  QuizQuestion,
  QuizScore
} from './app/views/screens';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

const createTabNavigator = Platform.select({
  [PLATFORM.iOS]: createBottomTabNavigator,
  [PLATFORM.Android]: createMaterialTopTabNavigator
});

const Tabs = createTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor:
        Platform.OS === PLATFORM.iOS ? colors.purple : colors.white,
      style: {
        height: 56,
        backgroundColor:
          Platform.OS === PLATFORM.iOS ? colors.white : colors.purple,
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowColor: colors.blackShadow,
        shadowOffset: {
          width: 0,
          height: 3
        }
      }
    }
  }
);

const defaultNavigationOptions = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.purple
  }
};

const noHeader = {
  header: null
};

const Quiz = createStackNavigator({
  QuizQuestion: {
    screen: QuizQuestion,
    navigationOptions: defaultNavigationOptions
  },
  QuizAnswer: {
    screen: QuizAnswer,
    navigationOptions: defaultNavigationOptions
  },
  QuizScore: {
    screen: QuizScore,
    navigationOptions: defaultNavigationOptions
  }
});

const AppContainer = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: noHeader
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: defaultNavigationOptions
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: defaultNavigationOptions
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: noHeader
    }
  })
);

const reduxStore = createReduxStore();

const App = () => (
  <Provider store={reduxStore}>
    <View style={{ flex: 1 }}>
      <StatusBarWrapper
        backgroundColor={colors.purple}
        barStyle="light-content"
      />
      <AppContainer />
    </View>
  </Provider>
);

export default App;
