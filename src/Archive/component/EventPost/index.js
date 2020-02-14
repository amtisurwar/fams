import React from 'react';
import { Text, View, Image,TouchableOpacity } from 'react-native';
import { Grid, Row, Col, Button } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

onPress = (props) => {
  const { navs, source, eventAddress, eventTitle, eventDescription, eventId } = props;
  navs.navigate("DetailEvent",{eventAddress, eventTitle, eventDescription, source, eventId})
}

const EventPost = props => (
  <View style={styles.viewStyle}>
    <Grid style={styles.gridStyle}>
      <Row>
        <Col size={20}>
        </Col>
        <Col size={80}>
          <TouchableOpacity onPress={() => this.onPress(props)}>
              <Text style={styles.eventTitle}>{props.eventTitle}</Text>
          </TouchableOpacity>
          <Text>{props.eventAddress}</Text>
          <Text>{props.eventDescription}</Text>
          <Button style={styles.buttonView} onPress={() => this.onPress(props)}>
            <Text style={styles.buttonText}>DOWNLOAD</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  </View>
);

EventPost.propType = {
  source: PropTypes.string,
  eventTitle: PropTypes.string,
  eventAddress: PropTypes.string,
  eventDescription: PropTypes.string,
  navs: PropTypes.object,
  onTitleClick: PropTypes.func,
};

export default EventPost;
