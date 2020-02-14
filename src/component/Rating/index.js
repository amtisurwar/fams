import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import styles from './styles';

export default class RatingView extends React.Component {
  render() {
    const { question, onFinishRating } = this.props;
    return (
      <View style={styles.ratingView}>
        <Text style={styles.question}>{question}</Text>
        <Rating
          ratingColor	="#000000"
          onFinishRating={onFinishRating}
          style={{ paddingVertical: 10 }}
        />
      </View>
    );
  }
}

RatingView.propType = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};
