import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import * as Common from '../../common/common';
import * as Constant from '../../common/constant';
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types';

const SearchBar = props => (
  <View style={props.styles}>
      <TextInput
        style={props.textInput}
        underlineColorAndroid={Common.lightGray}
        placeholderTextColor={Common.subTitleText}
        placeholder={Constant.searchHolder}
        onChangeText={(text) => props.textChange(text)}
        value={props.textValue}
      />
      <Icon name="ios-search" size={25} color="#d3d3d3" />
  </View>
);

SearchBar.propType = {
  textInput: PropTypes.object,
  textValue: PropTypes.string,
  textChange: PropTypes.func,
};

export default SearchBar;
