import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Common.splashBackground,
  },
  splashStyle: {
    height: Common.deviceHeight,
    width: Common.deviceWidth,
    resizeMode: 'stretch',
  },
  textStyle: {
    color: Common.blackColor,
    fontSize: Common.fontSizeH1,
    fontFamily: 'Roboto',
  },
  famText: {
    position: 'absolute',
    top: Common.deviceHeight / 1.6,
    alignSelf: 'center'
  }
});

module.exports = styles;
