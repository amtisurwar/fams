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
  upperView: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 12
    // justifyContent: 'space-between',
  },
  lowerView: {
    flex: 1,
    backgroundColor: 'red'
  },
  rowView: {
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
  titleStyle: {
    flexDirection: 'row',
    backgroundColor: Common.whiteColor,
  },
  headerContainerStyle: {
    flex: 1,
    margin: 5,
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
  cardStyles: {
    height: Common.deviceWidth / 3,
    width: Common.deviceWidth / 2.5,
    margin: 15,
  },
  secondaryStyles: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  cardStyleItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',

  },
  scrollViewClass: {
  marginBottom : 15,
  backgroundColor: '#fff'
  },
});

module.exports = styles;
