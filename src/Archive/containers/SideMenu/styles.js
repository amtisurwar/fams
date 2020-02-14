import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Common.whiteColor,
    flex: 1
  },
  userLogoStyle: {
    alignSelf: 'center',
    height: Common.deviceWidth / 5,
    width: Common.deviceWidth / 5
  },
  userNameStyle: {
    color: Common.blackColor,
    textAlign: 'center',
    padding: 10
  },
  logoViewStyle: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: Common.lightDarkColor
  },
  loginFeature: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Common.lightGray,
    padding: 15,
    flexDirection: 'row'
  },
  drawerMenuStyle: {
    padding: 15,
    flexDirection: 'row',
  },
  drawerMenuText: {
    paddingLeft: 8,
    marginTop: 5,
  },
  myItemsMenuStyle: {
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Common.lightDarkColor
  },
  drawerMenuItemsText: {
    paddingLeft: 8,
    color: Common.blackColor
  },
  menuSliderText: {
    fontWeight: 'bold'
  },
  loginSetting: {
    flex: 9
  },
  textViewWrapper: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  textWrapperStyle: {
    padding: 10,
  },
  separatorStyle: {
    borderBottomWidth: 0.5
  }
});

module.exports = styles;
