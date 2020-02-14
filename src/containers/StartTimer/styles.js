import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    resizeMode: 'stretch',
  },
  timerShow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: (Common.deviceHeight / 2.9)/2,
    height: Common.deviceHeight / 2.9,
    width: Common.deviceHeight / 2.9
  },
  upperTimerShow:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (Common.deviceHeight / 2.5)/2,
    borderColor : 'black',
    backgroundColor: '#fff',
    padding : 5,
    height: Common.deviceHeight / 2.5,
    width: Common.deviceHeight / 2.5
  },
  timerShowText: {
    color: Common.whiteColor,
    fontSize: Common.fontSizeGiant
  },
  timerViewPart: {
    top : '5%',
    alignItems: 'center',
    // top : -30
  },
  timerTextStyle: {
    fontSize: Common.fontSizeLarge,
    color: Common.blackColor,
    fontFamily: Common.novaRegularLight
  },
  runningTimeText: {
    alignItems: 'center',
    padding: 50,
    paddingBottom: 0
  },
  headerTextStyle: {
    color: Common.whiteColor,
    fontWeight: 'bold',
  },
  imageLogoStyle: {
    width: Common.deviceWidth / 10,
    height: Common.deviceWidth / 13,
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleStyle: {
    flexDirection: 'row',
    backgroundColor: Common.redColor,
    padding: 5,
    paddingBottom: 10,
    flex: 0.5
  },
  myJobTitle: {
    flexDirection: 'row',
    backgroundColor: Common.lightGray,
    justifyContent: 'space-around',
    flex: 0.8,
  },
  myJobId: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainerStyle: {
    flex: 1,
    margin: 5,
  },
  footer: {
    justifyContent: 'space-around',
    flexDirection : 'row',
    flex: 1,
    backgroundColor: Common.lightGray
  },
  timeValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonValue: {
    padding: 5,
    color: '#000',
    fontFamily: Common.novaRegularLight
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 4
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: Common.loginButton,
    padding: 5,
    alignItems: 'center'
  },
  pagination: {
    alignSelf: 'center',
    flex: 6,
  },
  myJobDataStyle: {
    borderBottomWidth: 0.5,
    borderColor: Common.lightGray,
    padding: 10,
    borderWidth: 1
  },
  buttonTextStyle: {
    color: Common.whiteColor
  },
  textContainerStyle: {
    justifyContent: 'center'
  },
  tableContent: {
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 13,
  },
  viewWrapper: {
    flex: 9,
  },
  tabStyle: {
    backgroundColor: Common.lightGreen,
  },
});

module.exports = styles;
