import React from 'react';
import PropTypes from 'prop-types';
import { Right, Body, Left, Header, Button, Icon as Icons, Title } from 'native-base';
import { TextInput, Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as Constant from '../../common/constant';
import SearchBar from '../SearchBar';
import styles from './styles';
import * as Common from '../../common/common';

export default class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <Header style={styles.headerContainer}>
        <Left style={{flexDirection: 'row'}}>
          <View style={{ paddingRight: 10, borderRightWidth: 0.5}}>
          <Button transparent onPress={this.props.onLeftIconClick} >
            <Icons active name={this.props.leftIcon} style={styles.iconStyle} />
          </Button>
          </View>
          <Image source={this.props.imageIcon} style={this.props.imageLogoStyle} />
        </Left>
        <Right >
        {(!this.props.search) ?
          <View style={{flexDirection: 'row'}}>
            <Button transparent onPress={this.props.onRightIconFirstClick}>
              <Icon active name={this.props.rightIconFirst} style={[styles.iconStyle,{ marginRight: -5,position: 'relative'}]} />
              { this.props.notificationCount === "0" || this.props.notificationCount === undefined ? null : <Text style={styles.notificationCountStyle}>{this.props.notificationCount}</Text>}
            </Button>
            {/*<Button transparent onPress={this.props.onRightIconClick}>
              <Icons active name={this.props.rightIcon} style={styles.iconStyle} />
            </Button>*/}
          </View> :
          <SearchBar
            styles={styles.searchBorder}
            textInput = {styles.textInput}
            textChange={(data) => this.setState({text: data})}
            textValue={this.state.text}
          />}
        </Right>
      </Header>
    );
  }
}

Header.propType = {
  onLeftIconClick: PropTypes.func,
  iconName: PropTypes.string,
  leftIcon: PropTypes.string,
  title: PropTypes.string,
  rightIcon: PropTypes.string,
};
