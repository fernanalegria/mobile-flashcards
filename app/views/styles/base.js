import { StyleSheet, Platform } from 'react-native';
import * as colors from './colors';
import { PLATFORM } from '../utils/constants';

const textCenter = {
  textAlign: 'center'
};

const stretch = {
  justifyContent: 'center',
  alignItems: 'stretch'
};

export default StyleSheet.create({
  textCenter,
  stretch,
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  container: {
    flex: 1,
    ...stretch
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
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: Platform.OS === PLATFORM.iOS ? 16 : 2,
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: colors.blackShadow,
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});
