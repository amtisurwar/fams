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
  activityIndicator: {
    position: 'absolute',
    top: Common.deviceHeight / 2,
    alignSelf: 'center'
  },
  image: {
    resizeMode: 'stretch',
  },
  modalView: {
    position: "absolute",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDoc: {
    color: 'blue'
  },
  modalSubContainer: {
    height: Common.deviceHeight / 4.75,
    backgroundColor: "#D3D3D3",
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  inputStyle: {
    flexDirection: 'row',
    backgroundColor: Common.whiteColor,
    margin: 5,
    width: '100%'
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
    flex: 0.5
  },
  myJobTitle: {
    flexDirection: 'row',
    backgroundColor: Common.blackColor,
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
  myJobDataStyle: {
    borderBottomWidth: 0.5,
    borderColor: Common.lightGray,
    padding: 10,
    paddingHorizontal: 0,
    borderWidth: 1
  },
  buttonTextStyle: {
    color: Common.whiteColor
  },
  buttonSubmitStyle: {
    backgroundColor: Common.loginButton,
    padding: 9,
    width: Common.deviceWidth / 5,
  },
  buttonCancelStyle: {
    backgroundColor: Common.cancelButton,
    padding: 8,
    width: Common.deviceWidth / 4,
  },
  textInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom : 10,
    marginLeft : -15,
    width: 230,
    height: 35,
    backgroundColor: '#fff',
    fontFamily: Common.novaRegularLight,
    borderWidth: 1,
    borderColor: '#ccc'
  },

  commentSection: {
    textAlign: 'center',
    color: '#d3d3d3',
    fontSize: Common.fontSizeLarge,
    padding: 10,
    paddingTop: 0
  },
  textContainerStyle: {
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  tableContent: {
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  browserStyle: {
    marginTop: 20,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center'
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
