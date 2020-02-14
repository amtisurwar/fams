
import React, { Component } from 'react';
import { AppRegistry, View, TouchableOpacity } from 'react-native';
import {
    Icon,
    Text,
    Header,
    Body,
    Title,
    List,
    ListItem,
  } from "native-base";

import styles from './styles'

export default class AgendaDetail extends Component {
  render() {
    const { eventTitle,eventDescription,eventAddress } =this.props.infoDetail
    return (

      // Try setting `flexDirection` to `column`.
      <View style={{flex: 4, flexDirection: 'column', justifyContent: 'space-around',}}>
      <Header style={styles.headerStyle}>
                    <Body >
                        <Title style={styles.forTitle} >{eventTitle}</Title>
                        <Text style={styles.forSubTitle}>{eventDescription}</Text>
                        <Text style={styles.forSubTitle}>{eventAddress}</Text>
                    </Body>
                </Header>
                <List>

                  <ListItem >
                    <TouchableOpacity onPress={() => this.props.nav.navigate('ScheduleByDay',this.props.infoDetail)} >
                    <Text>Schedule By Day</Text>
                  </TouchableOpacity>
                  </ListItem>
                  <ListItem>
                  <TouchableOpacity onPress={() => this.props.nav.navigate('ScheduleBySpeaker',this.props.infoDetail)} >
                    <Text>Schedule By Speakers</Text>
                    </TouchableOpacity>
                  </ListItem>

                </List>

      </View>

    );
  }
};

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => FlexDirectionBasics);
