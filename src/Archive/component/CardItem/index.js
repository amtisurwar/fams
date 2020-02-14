import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';
import * as Common from '../../common/common';
import * as Constant from '../../common/constant';
import styles from './styles'

const CardItem = props => (
  <TouchableOpacity style={props.styles} onPress={props.onPress}>
    <View style={styles.cardItemContainer}>
      <Icon name={props.icon} size={30}/>
      <View style={styles.textContainer}>
        <Text style={[styles.textStyle,styles.textCount]}>{props.count}</Text>
        <Text style={styles.textStyle}>{props.menuOption}</Text>
      </View>
    </View>
    <View style={props.secondaryStyles}>
      <Text style={[styles.textStyle, styles.moreInfoText]}>{'More Info'}</Text>
    </View>
  </TouchableOpacity>
);

CardItem.propType = {
  onPress: PropTypes.func,
  textInput: PropTypes.object,
  textValue: PropTypes.string,
  textChange: PropTypes.func,
};

export default CardItem;
