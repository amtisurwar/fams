import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'native-base'
import { TextInput, Image, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Common from '../../common/common';
import moment from 'moment';
import Icons from 'react-native-vector-icons/EvilIcons'

export default class DateRangeComponent extends React.Component {
  
  render() {
    return (
        <Col key={this.props.index} size={50} style={{ alignItems: this.props.index == 1 ? 'flex-end' : 'flex-start' }}>
        <View>
          <Text style={{ color: '#000', fontSize: 18, paddingBottom: 10 }}>{this.props.title}</Text>
          <DatePicker
            style={{ width: Common.deviceWidth / 2.4 }}
            date={this.props.valueData}
            mode="date"
            placeholder="mm/dd/yyyy"
            format="MM/DD/YYYY"
            // minDate={this.props.fromDate == '' ? moment().format('MM-DD-YYYY') : this.props.fromDate}
            minDate={this.props.isStartDate? moment().format('MM-DD-YYYY') :this.props.fromDate?moment(this.props.fromDate).format('MM-DD-YYYY'):moment().format('MM-DD-YYYY')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconComponent={<View style={{ borderWidth: 1, height: '100%', borderColor: '#ccc', justifyContent: 'center' }}><Icons name="calendar" size={30} /></View>}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 0,
                top: 4,
                marginLeft: 0,
                backgroundColor: 'red',
                borderLeftWidth: 1,
                borderColor: '#ccc'
              },
              dateInput: {
                marginLeft: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.props.onDateChange}

          />
        </View>
      </Col>

    );
  }
}

DateRangeComponent.propType = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};
