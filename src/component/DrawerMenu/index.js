import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types';

const DrawerMenu = props => (
  <TouchableOpacity style={props.menuStyle} onPress={props.onPress}>
    {props.text == 'Logout' || props.text == 'Apply Leave' ? <Image source={props.iconName} style={{ height: 20, width: 20, marginLeft : 5 }} />
      : <Image source={props.iconName} style={{ height: 21, width: 24  }} />
    }
    {/* <Icon name={props.iconName} style={{ alignSelf: 'center'}}/> */}
    <Text style={props.textStyle}>{props.text}</Text>
  </TouchableOpacity>
);

DrawerMenu.propType = {
  text: PropTypes.string,
  onPress: PropTypes.func
};

export default DrawerMenu;
