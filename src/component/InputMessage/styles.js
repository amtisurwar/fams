import { StyleSheet } from 'react-native';
import * as Common from '../../common/common';

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: Common.greyHardColor,
    flexDirection: 'column',
    width: '100%',
    marginTop : 15,
    height : 100
  },
  textColor: {
    color: Common.blackColor,
    fontSize : 18,
    
  },
})
module.exports = styles;
