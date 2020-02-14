import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import PropTypes from 'prop-types';
import styles from './styles';

const PunchingButton = props => (
  <TouchableOpacity onPress={props.onPress} style={props.punchIn}>
    <Icon name={props.icon} style={{alignSelf: 'center'}} size={25}/>
    <Text style={props.textButtonStyle}>{props.textbutton}</Text>
  </TouchableOpacity>
);

PunchingButton.propType = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default PunchingButton;
