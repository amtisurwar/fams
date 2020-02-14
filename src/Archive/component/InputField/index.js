import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import * as Common from '../../common/common';

export default class InputField extends React.Component {
  render() {
    const { inputStyle, iconName,maxLength, keyboardType,iconStyle, textInputStyle, text, value, onChange, colorUnderline, index, secureTextEntry} = this.props;
    return (
      <View style={[inputStyle,{borderBottomWidth: (index === 0) ? 1: 0, borderColor:(index === 0) ? Common.lightGray: null }]}>
        <Icon name={iconName} size={20} style={iconStyle}/>
        <TextInput
          autoCapitalize="none"
          style={textInputStyle}
          placeholder={text}
          value={value}
          maxLength = {maxLength}
          keyboardType = {keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          underlineColorAndroid={colorUnderline}
        />
      </View>
    );
  }
}

InputField.propType = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};
