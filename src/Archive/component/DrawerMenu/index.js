import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types';

const DrawerMenu = props => (
  <TouchableOpacity style={props.menuStyle} onPress={props.onPress}>
    <Icon name={props.iconName} style={{ alignSelf: 'center'}}/>
    <Text style={props.textStyle}>{props.text}</Text>
  </TouchableOpacity>
);

DrawerMenu.propType = {
  iconName: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func
};

export default DrawerMenu;
