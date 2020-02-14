import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  viewStyle: {
    padding: 15,
    paddingBottom: 0,
    flex: 1,
  },
  gridStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Common.lightGray,
    paddingBottom: 15,
  },
  eventImageStyle: {
    height: Common.deviceWidth / 7,
    width: Common.deviceWidth / 7,
    marginTop: 5,
  },
  buttonView: {
    backgroundColor: Common.lightGreen,
    marginTop: 10,
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Common.whiteColor,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 17,
    color: Common.darkBlack,
  },

});

module.exports = styles;
