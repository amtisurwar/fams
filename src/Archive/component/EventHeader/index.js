import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const EventHeader = props => (
  <View style={props.viewStyle}>
    <Text style={props.textStyle}>{props.date}</Text>
  </View>
);

EventHeader.propType = {
  date: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  viewStyle: PropTypes.object,
};

export default EventHeader;
