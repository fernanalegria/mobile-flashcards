import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createReduxStore } from './app/state/store';
import Test from './app/views/common/Test';

const reduxStore = createReduxStore();

const App = () => (
  <Provider store={reduxStore}>
    <View style={styles.container}>
      <Test />
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
