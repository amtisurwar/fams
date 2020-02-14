import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Common.lightGray,
  },
  iconStyle: {
    color: Common.blackColor,
    fontSize: 30,
  },
  textInput: {
    height: 40,
    width: Common.deviceWidth / 2.7,
    color: Common.blackColor,
    alignItems: 'center'
  },
  notificationCountStyle: {
    position: 'absolute',
    right: 10,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 60,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    color: Common.whiteColor
  },
  searchBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    backgroundColor: Common.whiteColor,
    borderColor: Common.blackColor,
    height: Common.deviceWidth / 10,
    width: Common.deviceWidth / 1.6,
  }
});

module.exports = styles;
