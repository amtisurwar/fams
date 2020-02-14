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
  leaveListTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Common.whiteColor,
    paddingRight: 5,
  },
  applyLeaveButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  punchIn: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 5,
    backgroundColor: Common.loginButton,
    paddingHorizontal: 10
  },
  textButtonStyle: {
    color: Common.whiteColor,
    alignSelf: 'center'
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
    backgroundColor: Common.whiteColor,
    padding: 5,
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
    justifyContent: 'center',
    flex: 6,
    flexDirection: 'row'
  },
  paginationBox: {
    flexDirection: 'row',
    marginLeft: 10,
    borderWidth: 0.5,
  },
  paginationPadding: {
    paddingHorizontal: 5,
    alignSelf: 'center'
  },
  paginationPaddingExtra: {
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  paginationViewBox: {
    borderLeftWidth: 0.5
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
    justifyContent: 'center',
  },
  tableContent: {
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  jobDescription: {
    color: '#007bff'
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
