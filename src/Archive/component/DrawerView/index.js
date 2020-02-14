import React, { Component } from 'react';
import { View } from 'react-native';
import { Drawer } from 'native-base';
import PropTypes from 'prop-types';

export default class DrawerView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Drawer
        ref={(ref) => this.props.referVar(ref)}
        type="displace"
        side="right"
        panOpenMask={0.2}
        content={this.props.content}
        onClose={this.props.onClose}
      >
        {this.props.children}
      </Drawer>

    );
  }
}

DrawerView.propType = {
  referVar: PropTypes.func,
  content: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.object,
};
