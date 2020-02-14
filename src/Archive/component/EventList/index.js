import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import EventPost from '../EventPost';
import EventHeader from '../EventHeader';
import styles from './styles';

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onTitleClick = this.onTitleClick.bind(this);
  }

  onTitleClick(id) {
    //this.props.navigation.navigate('DetailEvent');
  }

  eventList() {
    return (
      this.props.eventList.map((data, i) => (
        <EventPost
          onTitleClick={()=>this.onTitleClick(data.id)}
          navs={this.props.nav}
          source={data.source}
          eventId={data.id}
          key={data.id}
          eventTitle={data.eventTitle}
          eventAddress={data.eventAddress}
          eventDescription={data.eventDescription}/>
      ))
    );
  }
  render() {

    return (
      <View>
        <EventHeader
          viewStyle={styles.viewStyle}
          textStyle={styles.textStyle}
          date={this.props.date}
        />
        {
          this.props.eventList !== undefined ?
          this.eventList() : null
        }
      </View>
    );
  }
}

EventList.propType = {
  date: PropTypes.string,
  eventList: PropTypes.object,
  nav: PropTypes.object
};
