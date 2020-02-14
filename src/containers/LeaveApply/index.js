import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  NetInfo,
  Alert,
  TextInput,
  ScrollView,
  ToastAndroid,
  BackHandler,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import moment from 'moment';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/EvilIcons'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer';
import DatePicker from 'react-native-datepicker'
import WifiManager from 'react-native-wifi';
import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';
import InputField from '../../component/InputField';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import Button from '../../component/Button';
import * as Common from '../../common/common';
import PaginationBox from '../../component/PaginationBox';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune, mainText, logo, myJobTitle, leaveTypeField, dateField, reportedToField, leaveApplyButton, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'
import ImagePicker from 'react-native-image-picker';
import BottomTabBar from '../../component/BottomTabBar';

let paginationValue = 0;
const API_KEY = 'AIzaSyDJC-3OuY0yl49Jxe-N3DU6YyCT3Qv1Vkk';
class LeaveApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveTypeData: 'Select Leave',
      reportedToData: 'Select Manager',
      drawerOpen: false,
      netConnection: true,
      fromDate: '',
      toDate: '',
      date: '',
      latitude: '',
      longitude: '',
      listAttendanceItem: [],
      showIconlist: false,
      uploadText: 'Upload file....',
      Id: 0,
      leaveReason: '',
      listItem: [],
      leaveDropDown: [],
      uploadFileDetails: ''
    }
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else {
        const value = this.props.userCredential.data.UserID;
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });

            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + API_KEY)
              .then((response) => response.json())
              .then((responseJson) => {
                this.setState({ Address: responseJson.results[0].formatted_address });
              })
          },
          (error) => console.log(error),
        );

        NetworkInfo.getIPV4Address(ipv4 => {
          this.gatewayId = ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1';
        });

        this.props.dispatch({
          type: 'LOADER',
          payload: true,
        });

        this.props.dispatch({
          type: 'GET_EMPLOYEE_ATTENDANCE',
          payload: value
        });

        this.props.dispatch({
          type: 'GET_LEAVE_DROPDOWN',
          payload: value
        });

        this.props.dispatch({
          type: 'GET_ALL_SSID',
          payload: '',
          id: value
        });


        NetInfo.isConnected.fetch().then(isConnected => {
          if (!isConnected) {
            this.setState({ netConnection: false })
          }

        });
      }
    });
  }
  componentDidMount() {
    if (this.props.navigation.state.params == null) {
      this.setState({
        leaveTypeData: '',
        fromDate: '',
        toDate: '',
        leaveReason: '',
        Id: 0,
        uploadText:'Upload file....'
      })
    }
    else {
      let { params } = this.props.navigation.state;
      console.log("params", params);
      if (params.leaveDate !== undefined) {
        console.log("params.leaveDate", params.leaveDate);
        let { LeaveType, From_Date, To_Date, Created_Date, Reason, ID ,actualfilename} = params.leaveDate;
        console.log("inside")
        this.setState({
          leaveTypeData: LeaveType,
          fromDate: From_Date,
          toDate: To_Date,
          leaveReason: Reason,
          Id: ID,
          uploadText:actualfilename
        })
      }
      NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + API_KEY)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ Address: responseJson.results[0].formatted_address });
          })
      },
      (error) => console.log(error),
    );

  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    paginationValue = 0;
  }

  // _handleConnectionChange = (isConnected) => {
  //   if(isConnected) {
  //     this.setState({ netConnection: true})
  //   } else {
  //     ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
  //     this.setState({ netConnection: false})
  //   }
  //   WifiManager.getCurrentWifiSSID()
  //   .then((ssid) => {
  //       if(ssid !== wiredssid) {
  //         ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
  //        ToastAndroid.show('You are offline', ToastAndroid.SHORT);
  //       }
  //   }, () => {
  //       console.log('Cannot get current SSID!')
  //   })
  // };

  _handleConnectionChange = (isConnected) => {
    var defaultGateway = '';
    var ssid = '';
    if (isConnected) {
      NetworkInfo.getIPV4Address(ipv4 => {
        console.log("ipv4");
        defaultGateway = ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1';
        console.log(ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1');
      });
      NetworkInfo.getSSID(ssid => {
        ssid = ssid;
      });
      // if(ssid !== wiredssid && defaultGateway === defaultGatewayId) {
      if (defaultGateway !== defaultGatewayId) {
        //   ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        //  ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };


  componentWillReceiveProps(nextProps) {
    // if (nextProps.jobList !== this.props.jobList) {
    //   this.setState({ listItem: nextProps.jobList })
    // }
    if (nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listAttendanceItem: nextProps.attendance })
      this.props.dispatch({
        type: 'LOADER',
        payload: false,
      });
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance", nextProps.attendance);
    }

    if (nextProps.leaveData !== this.props.leaveData) {
      if (nextProps.leaveData.leaveType !== undefined) {
        if (nextProps.leaveData.leaveType.Data !== undefined && nextProps.leaveData.leaveType.StatusCode === '200') {
          if (nextProps.leaveData.leaveType.Data.LeaveType !== undefined && nextProps.leaveData.leaveType.Data.LeaveType.length) {
            this.setState({ leaveDropDown: nextProps.leaveData.leaveType.Data.LeaveType })
          }
        }
      }
    }

    if (nextProps.leaveApply !== this.props.leaveApply) {
      if (nextProps.leaveApply.leaveData !== undefined) {
        if (nextProps.leaveApply.leaveData.StatusCode !== undefined && nextProps.leaveApply.leaveData.StatusCode === '200') {
          ToastAndroid.show('Leave Successfully Applied', ToastAndroid.SHORT);
          if (this.props.navigation.state.params == null) {
            this.props.navigation.popToTop();
          }
          else {
            Helper.navigateToPage(this, 'goBack');

          }
        } else {
          ToastAndroid.show('Leave Not Applied', ToastAndroid.SHORT);
        }
        this.props.dispatch({
          type: 'LOADER',
          payload: false,
        });
      }
    }
   
    if((nextProps.uploadDoc && nextProps.uploadDoc.uploadDoc) && nextProps.uploadDoc.uploadDoc.Data !=this.props.uploadDoc.uploadDoc.Data){
      this.props.dispatch({
        type: 'LOADER',
        payload: false,
      });
    }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false })
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  onNextPress() { }

  onPreviousPress() { }

  onPressTab = (punchingData) => {
    console.log(punchingData);
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else {
        let { employeeAttendance } = this.state.listItem;
        console.log(employeeAttendance);
        var matchedId = [];
        var ssidDataList = this.props.ssidList.ssidList.Data;
        console.log(this.gatewayId);
        for (let i = 0; i < ssidDataList.length; i++) {
          if (this.gatewayId == ssidDataList[i].Gateway) {
            console.log('Found correct');
            matchedId.push(ssidDataList[i].Gateway);
          }
        }
        if (matchedId.length == 0) {
          Alert.alert(
            'Warning Message',
            'Do you want to punch with other network ?',
            [
              { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
              { text: 'Yes', onPress: () => this.sendEmployeeAttendance(punchingData, 1) },
            ],
            { cancelable: false }
          )
        }
        else {
          this.sendEmployeeAttendance(punchingData, 0);
        }
      }
    });


  }


  sendEmployeeAttendance(dataReceived, flag) {
    console.log("dataReceived", dataReceived.Value);
    // let { data } = this.props.userCredential;
    const dataValue = { "Id": "0", "UserId": this.props.userCredential.data.ID.toString(), "Lat": this.state.latitude, "Long": this.state.longitude, "LatLongAddress": this.state.Address, "Flag": flag, "StatusDate": moment().format('MM/DD/YY HH:mm'), "StatusType": dataReceived.Value, "AttendanceId": "0", "Comments": "check", "Created_By": "0", "Created_Date": "null", "Is_Active": "false" }
    // const dataValue = {"Id":"0","UserId":"50","StatusDate":"09/18/2018 16:29","StatusType":"1","AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    console.log("dataValue", dataValue);


    this.props.dispatch({
      type: 'POST_EMPLOYEE_ATTENDANCE',
      payload: dataValue,
      id: this.props.userCredential.data.UserID
    });

    if (dataReceived.Value === "4") {
      AsyncStorage.getItem('deviceToken').then((value) => {
        if (value !== null && value !== '' && value !== undefined) {
          const logoutValue = {
            Deviceid: DeviceInfo.getUniqueID(),
            RegId: value
          }

          this.props.dispatch({
            type: 'LOGOUT',
            payload: logoutValue,
            id: this.props.userCredential.data.UserID
          });
          AsyncStorage.setItem('userLogin', JSON.stringify(false));
          this.props.navigation.navigate('logout');

        }
      }).done();

    }
  }

  body() {
    return (
      // <View style={{ flex: 1 }}>
      //   <View style={{ flex: 9 }}>
      <ScrollView keyboardShouldPersistTaps="always" style={{ padding: 20, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#fff' }}>
        {this.leaveApplyField()}
      </ScrollView>
      //   </View>
      // </View>
    )
  }

  dropDownMenuHide(type) {
    if (type === 'leaveTypeData') {
      this.setState({ leaveTypeShow: false })
    } else if (type === 'reportedToData') {
      this.setState({ managerShow: false })
    }
  }

  dropDownMenu(menuOptions, type) {
    return menuOptions.map((data, i) => {
      return (
        <TouchableOpacity style={{ padding: 10 }} key={i} onPress={() => this.setState({ [type]: data.LeaveType }, () => { this.dropDownMenuHide(type) })}>
          <Text style={{ color: '#fff' }}>{data.LeaveType}</Text>
        </TouchableOpacity>
      )
    })
  }

  leaveType() {
    let { leaveTypeShow, leaveDropDown } = this.state;
    return (
      <View>
        <Row>
          <Col size={30}>
            <Text style={styles.textColor}>{leaveTypeField.title}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={70} onPress={() => this.setState({ leaveTypeShow: !leaveTypeShow, managerShow: false })}>
            <View style={{ flexDirection: 'row', marginTop: 15, borderWidth: 1, borderColor: '#ccc', paddingLeft: 5, paddingVertical: 10, paddingTop: 10, justifyContent: 'space-between' }}>
              <Text>{this.state[leaveTypeField.type]}</Text>
              <Icon name="ios-arrow-down" style={{ backgroundColor: '#fff', paddingRight: 10, size: 20, alignSelf: 'stretch' }} />
            </View>

          </Col>
        </Row>
        <Row style={{ position: 'absolute', top: 40, width: '100%', zIndex: 99999 }}>
          <Col size={30} />
          <Col size={70} style={{ backgroundColor: '#000' }}>
            {leaveTypeShow && this.dropDownMenu(leaveDropDown, leaveTypeField.type)}
          </Col>
        </Row>
      </View>
    )
  }

  reportedTo() {
    let { managerShow } = this.state;
    return (
      <View>
        <Row>
          <Col size={30}>
            <Text style={{ color: '#000' }}>{reportedToField.title}</Text>
          </Col>
          <Col size={70} onPress={() => this.setState({ managerShow: !managerShow, leaveTypeShow: false })}>
            <View style={{ zIndex: 999, flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', paddingLeft: 5, paddingVertical: 10, justifyContent: 'space-between' }}>
              <Text>{this.state[reportedToField.type]}</Text>
              <Icon name="ios-arrow-down" style={{ backgroundColor: '#fff', paddingRight: 3, alignSelf: 'stretch' }} />
            </View>

          </Col>
        </Row>
        <View style={{ backgroundColor: '#000', position: 'absolute', top: 40, zIndex: 99999, width: '100%' }}>
          {managerShow && this.dropDownMenu(reportedToField.field, reportedToField.type)}
        </View>
      </View>
    )
  }

  leaveDurationTo() {
    return dateField.map((data, i) => {
      return (
        <Col key={i} size={50} style={{ alignItems: i == 1 ? 'flex-end' : 'flex-start' }}>
          <View>
            <Text style={{ color: '#000', fontSize: 18, paddingBottom: 10 }}>{data.title}</Text>
            <DatePicker
              style={{ width: Common.deviceWidth / 2.4 }}
              date={this.state[data.value]}
              mode="date"
              placeholder="mm/dd/yyyy"
              format="MM/DD/YYYY"
              minDate={data.isStartDate? moment().format('MM-DD-YYYY') :this.state.fromDate?moment(this.state.fromDate).format('MM-DD-YYYY'):moment().format('MM-DD-YYYY')}
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
              onDateChange={(date) => {
                if (data.isStartDate && (this.state.fromDate && this.state.toDate) && (moment(date).isAfter(this.state.toDate))) {
                  ToastAndroid.show('Incorrect date range', ToastAndroid.SHORT);
                }
                else {
                  this.setState({ [data.value]: date })
                }
              }
              }

            />
          </View>
        </Col>
      )
    })
  }

  leaveDuration() {
    return (
      <Row style={{ paddingVertical: 10, alignItems: 'space-between' }}>
        {this.leaveDurationTo()}
      </Row>
    )
  }

  reasonToLeave() {
    return (
      // <Row style={{justifyContent: 'space-between', paddingVertical: 15}}>
      <View style={{ justifyContent: 'space-between', paddingVertical: 0 }}>
        <Row>
          <Col size={30}>
            <Text style={styles.textColor}>{'Reason'}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={70}>
            <View style={styles.inputStyle}>
              <TextInput
                autoCapitalize="none"
                multiline={true}
                value={this.state.leaveReason}
                onChangeText={(text) => this.setState({ leaveReason: text })}
                underlineColorAndroid="transparent"
              />
            </View>
          </Col>
        </Row>
      </View>
    )
  }

  onEditPress = () => {
    console.log("onEditPress")
  }

  onSubmitPress = () => {
    const value = this.props.userCredential.data.UserID;
    const id = this.props.userCredential.data.ID;
    if (this.state.netConnection) {
      if (this.state.fromDate !== '' && this.state.toDate !== '') {
        this.props.dispatch({
          type: 'LOADER',
          payload: true,
        });
        let data = {
          ID: this.state.Id,
          User_ID: value,
          From_Date: this.state.fromDate,
          To_Date: this.state.toDate,
          Reason: this.state.leaveReason,
          LeaveType: Helper.reasonType(this.state.leaveTypeData.toString().toUpperCase()),
        }
        if (this.uploadedFileText() !== '' && this.uploadedFileText() !== null) {
          Object.assign(data, this.props.uploadDoc.uploadDoc.Data)
        }
        this.props.dispatch({
          type: 'LEAVE_APPLY',
          payload: data,
          id: value
        });
      } else {
        ToastAndroid.show('Please enter valid data', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('No internet Connection', ToastAndroid.SHORT);
    }
  }

  onCancelPress = () => {
    // this.setState({
    //   leaveTypeData: 'Select Leave',
    //   fromDate: '',
    //   toDate: '',
    //   leaveReason: '',
    // })
    Helper.navigateToPage(this, 'goBack')
  }

  applyButtonText(data, index) {
    if (this.props.navigation.state.params == null) {
      return data
    }
    else {
      let { params } = this.props.navigation.state;
      if (params.leaveDate !== undefined && index === 0) {
        return "UPDATE";
      } else {
        return data
      }
    }

  }

  editSubmitToggle(data) {
    this.onSubmitPress();

    // console.log("params.leaveDate", params.leaveDate);
    // if(params.leaveDate === undefined) {
    //   // console.log("submit");
    //   // this.onSubmitPress();
    // } else {
    //   // console.log("editButton")
    //   // this.onSubmitPress();
    // }
  }

  applyButton() {
    return (
      <Row style={{ paddingVertical: 30, justifyContent: 'space-between' }}>
        {leaveApplyButton.map((data, i) => {
          return (
            <Button
              key={i}
              buttonTextStyle={styles.buttonTextStyle}
              text={this.applyButtonText(data.button, i)}
              style={data.id === 1 ? styles.buttonSubmitStyle : styles.buttonCancelStyle}
              disabled={this.props.loading.loader}
              onPress={() => { data.id === 1 ? this.editSubmitToggle(data.button) : this.onCancelPress() }}
            />
          )
        })}
      </Row>
    )
  }

  onBrowsePress(type) {
    let id = this.state.Id;
    var typeofDocument = type;
    if (typeofDocument == 'image') {
      typeofDocument = DocumentPickerUtil.images();
    }
    else {
      typeofDocument = DocumentPickerUtil.pdf();
    }
    DocumentPicker.show({
      filetype: [typeofDocument],
    }, (error, res) => {
      console.log("res", res);
      try {
        if (res !== undefined) {
          console.log("res", res);
          if (res.fileName !== undefined && res.fileName !== null) {
            this.setState({ uploadFileDetails: res, showIconlist: false, uploadText: res.fileName });
            ToastAndroid.show('Attachment Saved', ToastAndroid.SHORT);
            let data = new FormData();
            data.append('resource', {
              name: res.fileName,
              uri: res.uri, type: res.type
            });
            data.append('id', id)
            this.props.dispatch({
              type: 'LOADER',
              payload: true,
            });
            this.props.dispatch({
              type: 'UPDATE_DOC',
              payload: data
            })
          }
        }
      } catch (e) {
        console.log("exception", e);
      }
    });
  }

  pickImageHandler = () => {
    let id = this.state.Id;
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({ showIconlist: false, uploadText: res.fileName, uploadFileDetails: res });
        ToastAndroid.show('Attachment Saved', ToastAndroid.SHORT);
        console.log(res)
        // this.setState({ uploadFileDetails: res })
        let data = new FormData();

        data.append('resource', {
          name: res.fileName,
          uri: res.uri, type: res.type
        });
        data.append('id', id)
        this.props.dispatch({
          type: 'LOADER',
          payload: true,
        });
        this.props.dispatch({
          type: 'UPDATE_DOC',
          payload: data
        })

      }
    });
  }
  uploadedFileText() {
    if (this.state.uploadFileDetails !== '' && this.state.uploadFileDetails !== null) {
      if (this.state.uploadFileDetails.fileName !== undefined && this.state.uploadFileDetails.fileName !== null) {
        return this.state.uploadFileDetails.fileName;
      }
    } else {
      return "";
    }
  }

  showIconlist = () => {
    this.setState({ showIconlist: !this.state.showIconlist });
  }

  uploadFile() {
    return (
      <View>
        <Row>
          <Col size={85}>
            <View style={[styles.uploadTextStyle,{flex:1,alignItems:"center",justifyContent:"center"}]}>
              <Text style={{ color: '#696969', padding: 3 }}>{Helper.truncateWords(this.state.uploadText, 80)}</Text>
            </View>
          </Col>
          <Col size={15} onPress={this.uploadedFileText()} style={{ flexDirection: 'row', backgroundColor: '#D3D3D3', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.showIconlist()} >
              <Icon name='md-link' size={29} style={{ paddingLeft: 10 }} />
            </TouchableOpacity>
          </Col>
        </Row>

        {this.state.showIconlist ?

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
              <TouchableOpacity onPress={() => this.onBrowsePress('image')}>
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', left: 3, marginBottom: 1 }} name='md-image' size={23} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: 43, height: 45, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
              <TouchableOpacity onPress={this.pickImageHandler} >
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', left: 2, marginBottom: 0 }} name='md-camera' size={23} />
                </View>
              </TouchableOpacity>

            </View>
            <View style={{ width: 43, height: 45, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
              <TouchableOpacity onPress={() => this.onBrowsePress('document')} >
                <View style={styles.iconViewStyle}>
                  <Icon style={{ padding: 5, color: '#fff', marginBottom: 0, left: 4 }} name='md-document' size={23} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          : null}
      </View>
    )
  }

  leaveApplyField() {
    let { leaveTypeShow, managerShow } = this.state;
    return (
      <View>
        <View style={{ position: 'relative' }}>
          {this.leaveType()}
        </View>
        {this.leaveDuration()}
        {this.reasonToLeave()}
        <View style={{ paddingTop: 20 }}>
          {this.uploadFile()}
        </View>
        {/*<View style={{position: 'relative'}}>
          {this.reportedTo()}
        </View>*/}
        {this.applyButton()}
      </View>
    )
  }

  render() {
    var loader = this.props.loading.loader;
    let { employeeAttendance } = this.state.listAttendanceItem;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <Header
          headerContainer={styles.headerContainerStyle}
          headerText={'Apply Leave'}
          headerTextStyle={styles.headerTextStyle}
          headerLeft={{ padding: 10 }}
          notificationCount={this.props.notificationCount.notification}
          onLeftIconClick={() => this.openControlPanel()}
          onRightIconClick={() => this.setState({ search: !this.state.search })}
          onRightIconFirstClick={() => Helper.navigateToPage(this, 'Notifications', { counterNo: this.props.notificationCount.notification })}
          rightIcon="ios-search"
          leftIcon="ios-menu"
          rightIconFirst="notifications-none"
          search={this.state.search}
          imageIcon={logo}
          imageLogoStyle={styles.imageLogoStyle}
        />
        <Drawer
          open={this.state.drawerOpen}
          type="overlay"
          tapToClose={true}
          panOpenMask={0.2}
          panThreshold={0.25}
          ref={(ref) => { this.drawer = ref }}
          content={<SideMenu {...this.props} onDrawerItemClick={(val) => this.setState({ drawerOpen: val })} />}
          openDrawerOffset={0.2}
          onClose={() => this.closeControlPanel()} >
          <View style={styles.viewWrapper}>
            {this.body()}
          </View>
        </Drawer>

        {employeeAttendance === undefined || employeeAttendance.message == "Network request failed" ? null : <BottomTabBar onPressTab={this.onPressTab} punchInList={employeeAttendance} />}
        {loader && <View style={styles.activityIndicator}>
          <ActivityIndicator
            color="#000"
            size={30}
          />
        </View>}
      </View>
    )
  }
}


const mapStateToProps = state => ({
  jobList: state.jobList,
  userCredential: state.userCredential,
  leaveData: state.leaveData,
  uploadDoc: state.uploadDoc,
  leaveApply: state.leaveApply,
  loading: state.loading,
  ssidList: state.allSsidData,
  attendance: state.employeeAttendance,
  notificationCount: state.notificationCount,
});

export default connect(mapStateToProps)(LeaveApply);
