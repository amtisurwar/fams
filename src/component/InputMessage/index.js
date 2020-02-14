import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'native-base'
import { TextInput, Image, View, Text } from 'react-native';
import styles from './styles';

export default class InputMessage extends React.Component {
  
  render() {
    return (
      <View style={{ justifyContent: 'space-between', paddingVertical: 0 }}>
      <Row>
        <Col size={30}>
          <Text style={styles.textColor}>{'Reason'}</Text>
        </Col>
      </Row>
      <Row>
        <Col size={70}>
          <View style={styles.inputStyle}>
            <TextInput
              autoCapitalize="none"
              multiline={true}
              maxLength={300}
              value={this.props.value}
              onChangeText={this.props.onChangeText}
              underlineColorAndroid="transparent"
            />
          </View>
        </Col>
      </Row>
    </View>
    );
  }
}

InputMessage.propType = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
