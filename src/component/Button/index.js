import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={this.props.style}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}} opacity={this.props.disabled ? 0.3: 1}>
          <Icon name={this.props.iconName} style={{alignSelf: 'center', paddingRight: 5, color: '#fff'}}/>
          <Text style={this.props.buttonTextStyle}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propType = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};
