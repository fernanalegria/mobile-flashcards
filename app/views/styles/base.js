import { StyleSheet } from 'react-native';
import * as colors from './colors';

const textCenter = {
  textAlign: 'center'
};

export default StyleSheet.create({
  textCenter,
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  title: {
    color: colors.black,
    fontSize: 35,
    ...textCenter
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContent: {
    fontSize: 22,
    color: colors.white
  }
});
