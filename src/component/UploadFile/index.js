import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'native-base'
import { TextInput, Image, View,TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Icon from "react-native-vector-icons/Ionicons";

export default class UploadFile extends React.Component {
  
  render() {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: '#808080',
            left: '60%',
            borderRadius: 2,
            bottom: 50
          }}>
            <View style={{ width: 43, height: 45, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
              <TouchableOpacity onPress={() => this.props.onBrowsePress('image')}>
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', left: 3, marginBottom: 1 }} name='md-image' size={23} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: 43, height: 45, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
            <TouchableOpacity onPress={this.props.pickImageHandler} >
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', left: 2, marginBottom: 0 }} name='md-camera' size={23} />
                </View>
              </TouchableOpacity>
              </View>
            <View style={{ width: 43, height: 45, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
              <TouchableOpacity onPress={() => this.props.onBrowsePress('document')} >
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', marginBottom: 0, left: 4 }} name='md-document' size={23} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
    )
}
}


