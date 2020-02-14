import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: Common.whiteColor,
    flex: 1,
  },
  userLogoStyle: {
    alignSelf: 'center',
    height: Common.deviceWidth / 5,
    width: Common.deviceWidth / 5,
    borderRadius : 100,
    backgroundColor: Common.whiteColor,
    borderColor: Common.lightGray,
    borderWidth: 2
  },
  activityIndicator: {
    position: 'absolute',
    top: Common.deviceHeight / 2,
    alignSelf: 'center'
  },
  userNameStyle: {
    color: Common.blackColor,
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    paddingTop : 35,
  },
  addresNameStyle: {
    color: Common.blackColor,
    textAlign: 'center',
    padding: 10,
    paddingLeft : 0
  },
  logoViewStyle: {
    padding: 20,
    height: '75%',
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
    padding: 12,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: Common.lightDarkColor
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
