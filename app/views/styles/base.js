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
  title: {
    color: colors.black,
    fontSize: 35,
    ... textCenter
  }
});
