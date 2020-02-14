import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.whiteColor,
  },
  body: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  imageLogo: {
    width: Common.deviceWidth / 3,
    height: Common.deviceWidth / 3,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop : -40,
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 3,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    alignSelf: 'center'
  },
  otpInput:{
   marginTop: 20
  },
  inputStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Common.whiteColor,
    margin: 5,
    height: 40,
    borderRadius: 20
    
  },
  iconStyle: {
    padding: 10
  },
  textInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    borderRadius: 20,
    backgroundColor: '#fff',
    fontFamily: Common.novaRegularLight
  },
  topBar:{
    flex: 1,
    height: 130,
    backgroundColor: 'rgb(244, 4, 4)',
    opacity: 0.6
  },
  activityStyle: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: Common.deviceHeight / 2,
    left: Common.deviceWidth / 2.3,
  },
  logInTitle: {
    // padding: 30,
    // backgroundColor: Common.blackColor
  },
  logInTitleText: {
    color: Common.blackColor,
    fontSize: 20,
    fontWeight: '500'
  },
  logInCaptionText: {
    fontSize: 15,
  },
  logInViewStyle: {
    // top: 80,
    marginLeft: 20,
    marginRight: 20,
  },
  welcomeMsg: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeMsgText: {
    fontSize: Common.fontSizeH3,
    color: Common.redColor,
    textAlign: 'center',
    paddingTop: 20,
    marginTop: 12,
    fontWeight: '400',
    fontFamily: Common.novaRegularLight
  },
  loginView:{
   marginTop: -20
  },
  sendOtpMsgText:{
    marginTop: 10,
    color: Common.blackColor,
    padding: 9,
    textAlign: 'center',
    fontSize: Common.fontSizeMedium,
    fontFamily: Common.novaRegularLight
  },
  forgotText: {
    color: Common.blackColor,
    fontFamily: Common.novaRegularLight,
    marginTop: 20,

  },
  aboutText: {
    padding: 20,
    paddingTop: 0,
  },
  textStyle: {
    fontSize: 16,
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: Common.loginButton,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 20,
    paddingTop: 11,
  },
  buttonTextStyle: {
    color: Common.whiteColor,
    fontFamily: Common.novaRegularLight,
    fontSize: 14,
    fontWeight: '400',
  },
  termsConditionStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    padding: 20,
  },
  termStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: Common.darkBlack
  },
  privacyStyle: {
    textDecorationLine: 'underline'
  },
  termUseStyle: {
    textDecorationLine: 'underline'
  },
});

module.exports = styles;
