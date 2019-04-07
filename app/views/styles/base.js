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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
  },
  textInput: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.boulder,
    margin: 25
  }
});
