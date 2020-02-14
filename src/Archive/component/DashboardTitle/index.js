import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types';
import styles from './styles';

const DashboardTitle = props => (
  <View style={props.titleStyle}>
    {props.materialIcons ?
      <MaterialCommunityIcons name={props.name} style={{alignSelf: 'center'}} size={25}/> :
      (props.fontAwesome) ?
      <FontAwesome name={props.name} style={{alignSelf: 'center'}} size={20}/> :
      <Icon name={props.name} style={{alignSelf: 'center'}} size={25}/>
    }

    <Text style={[styles.textStyle, {fontWeight: props.boldShow ? '600' : '100'}]}>{props.title}</Text>
    {props.titleSubPath &&
      <Text style={{color: 'black', alignSelf: 'center'}}>{' > '}{props.titleSubPath}</Text>
    }
  </View>
);

DashboardTitle.propType = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default DashboardTitle;
