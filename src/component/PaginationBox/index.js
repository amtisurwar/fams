import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';
import * as Common from '../../common/common';
import * as Constant from '../../common/constant';
import styles from './styles'

const PaginationBox = props => (
  <View style={styles.paginationBox}>
    <View style={styles.paginationPaddingExtra}>
      <Text>{props.textItem}</Text>
    </View>
    <TouchableOpacity style={[styles.paginationPadding, styles.paginationViewBox]}>
      <Icon name="ios-arrow-down" />
    </TouchableOpacity>
  </View>
);

PaginationBox.propType = {
  textInput: PropTypes.object,
  textValue: PropTypes.string,
  textChange: PropTypes.func,
};

export default PaginationBox;
