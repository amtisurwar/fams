import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  NetInfo,
  TextInput,
  ScrollView,
  ToastAndroid,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import moment from 'moment';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/EvilIcons'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import DatePicker from 'react-native-datepicker'
import WifiManager from 'react-native-wifi';
import { NetworkInfo } from 'react-native-network-info';

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
import { eventList, eventListJune , mainText, logo, myJobTitle, leaveTypeField, dateField, reportedToField, leaveApplyButton, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

let paginationValue = 0;
class MyJobs extends Component {
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
      Id: 0,
      leaveReason: '',
      listItem: [],
      leaveDropDown: [],
      uploadFileDetails: ''
    }
  }

  componentWillMount() {
    const value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'GET_LEAVE_DROPDOWN',
      payload: value
    });
    NetInfo.isConnected.fetch().then(isConnected => {
      if(!isConnected) {
        this.setState({ netConnection: false })
      }
    });
  }

  componentDidMount() {
  let { params } = this.props.navigation.state;
  console.log("params", params);
  if(params.leaveDate !== undefined) {
    console.log("params.leaveDate", params.leaveDate);
    let { LeaveType, From_Date, Created_Date, Reason, ID } = params.leaveDate;
    console.log("inside")
    this.setState({
      leaveTypeData: LeaveType,
      fromDate: From_Date,
      toDate: Created_Date,
      leaveReason: Reason,
      Id: ID
    })
  }
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
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
  //         BackHandler.exitApp();
  //       }
  //   }, () => {
  //       console.log('Cannot get current SSID!')
  //   })
  // };

  _handleConnectionChange = (isConnected) => {
    var defaultGateway = '';
    var ssid = '';
    if(isConnected) {
      NetworkInfo.getIPV4Address(ipv4 => {
        console.log("ipv4");
        defaultGateway = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
        console.log(ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1');
      });
      NetworkInfo.getSSID(ssid => {
        ssid = ssid;
      });
      // if(ssid !== wiredssid && defaultGateway === defaultGatewayId) {
      if(defaultGateway !== defaultGatewayId) {
        ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        BackHandler.exitApp();
      }
    } else {
      BackHandler.exitApp();
      ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };


  componentWillReceiveProps(nextProps) {
    if(nextProps.jobList !== this.props.jobList) {
      this.setState({ listItem: nextProps.jobList})
    }
    if(nextProps.leaveData !== this.props.leaveData) {
      if(nextProps.leaveData.leaveType !== undefined) {
        if(nextProps.leaveData.leaveType.Data !== undefined && nextProps.leaveData.leaveType.StatusCode === '200') {
          if(nextProps.leaveData.leaveType.Data.LeaveType !== undefined && nextProps.leaveData.leaveType.Data.LeaveType.length) {
            this.setState({ leaveDropDown: nextProps.leaveData.leaveType.Data.LeaveType })
          }
        }
      }
    }

    if(nextProps.leaveApply !== this.props.leaveApply) {
      if(nextProps.leaveApply.leaveData !== undefined) {
        if(nextProps.leaveApply.leaveData.StatusCode !== undefined && nextProps.leaveApply.leaveData.StatusCode === '200') {
          ToastAndroid.show('Leave Successfully Applied', ToastAndroid.SHORT);
          Helper.navigateToPage(this, 'goBack');
        } else {
          ToastAndroid.show('Leave Not Applied', ToastAndroid.SHORT);
        }
      }
     }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }

  onNextPress() {}

  onPreviousPress() {}

  body() {
    return(
      <View style={{flex: 1}}>
        <DashboardTitle
          title="Leave Apply"
          name="calendar"
          titleStyle={styles.titleStyle}
        />
        <View style={{flex: 9}}>
          <ScrollView keyboardShouldPersistTaps="always" style={{padding: 20, borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#fff'}}>
            {this.leaveApplyField()}
          </ScrollView>
        </View>
      </View>
    )
  }

  dropDownMenuHide(type) {
    if(type === 'leaveTypeData') {
      this.setState({ leaveTypeShow: false })
    } else if(type === 'reportedToData') {
      this.setState({ managerShow: false })
    }
  }

  dropDownMenu(menuOptions, type) {
    return menuOptions.map((data, i) => {
      return (
        <TouchableOpacity style={{padding: 10}} key={i} onPress={() => this.setState({[type]: data.LeaveType },() => {this.dropDownMenuHide(type)})}>
          <Text style={{color: '#fff'}}>{data.LeaveType}</Text>
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
            <Text style={{color: '#000'}}>{leaveTypeField.title}</Text>
          </Col>
          <Col size={70} onPress={() => this.setState({ leaveTypeShow: !leaveTypeShow, managerShow: false })}>
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', paddingLeft: 5, paddingVertical: 10, justifyContent: 'space-between'}}>
              <Text>{this.state[leaveTypeField.type]}</Text>
              <Icon name="ios-arrow-down" style={{ backgroundColor: '#fff', paddingRight: 3, alignSelf: 'stretch'}}/>
            </View>

          </Col>
        </Row>
        <Row style={{position: 'absolute', top: 40, width: '100%', zIndex:99999}}>
          <Col size={30}/>
          <Col size={70} style={{backgroundColor: '#000'}}>
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
            <Text style={{color: '#000'}}>{reportedToField.title}</Text>
          </Col>
          <Col size={70} onPress={() => this.setState({ managerShow: !managerShow, leaveTypeShow: false })}>
            <View style={{zIndex:999, flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', paddingLeft: 5, paddingVertical: 10, justifyContent: 'space-between'}}>
              <Text>{this.state[reportedToField.type]}</Text>
              <Icon name="ios-arrow-down" style={{ backgroundColor: '#fff', paddingRight: 3, alignSelf: 'stretch'}}/>
            </View>

          </Col>
        </Row>
        <View style={{backgroundColor: '#000', position: 'absolute', top: 40, zIndex:99999, width: '100%'}}>
          {managerShow && this.dropDownMenu(reportedToField.field, reportedToField.type)}
        </View>
      </View>
    )
  }

  leaveDurationTo() {
    return dateField.map((data, i) => {
      return (
        <Col key={i} size={50} style={{ alignItems: i == 1 ?'flex-end':'flex-start'}}>
          <View>
          <Text style={{color: '#000', paddingBottom: 10}}>{data.title}</Text>
          <DatePicker
            style={{width: Common.deviceWidth / 2.4}}
            date={this.state[data.value]}
            mode="date"
            placeholder="dd/ mm/ yy"
            format="MM/DD/YYYY"
            minDate={moment().format('YYYY-MM-DD')}
            maxDate="2020-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconComponent= {<View style={{borderWidth: 1, height: '100%', borderColor: '#ccc', justifyContent: 'center'}}><Icons name="calendar" size={30}/></View>}
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
            onDateChange={(date) => {this.setState({[data.value]: date})}}
          />
          </View>
        </Col>
      )
    })
  }

  leaveDuration() {
    return (
      <Row style={{paddingVertical: 10, alignItems: 'space-between'}}>
        {this.leaveDurationTo()}
      </Row>
    )
  }

  reasonToLeave() {
    return (
      <Row style={{justifyContent: 'space-between', paddingVertical: 15}}>
        <Col size={30}>
          <Text style={styles.textColor}>{'Reason for Leave'}</Text>
        </Col>
        <Col size={70}>
          <View style={styles.inputStyle}>
            <TextInput
              autoCapitalize="none"
              value={this.state.leaveReason}
              onChangeText={(text) => this.setState({leaveReason:text})}
              underlineColorAndroid="transparent"
            />
          </View>
        </Col>
      </Row>
    )
  }

  onEditPress = () => {
    console.log("onEditPress")
  }

  onSubmitPress = () => {
    console.log("onSubmitPress")
    const value = this.props.userCredential.data.UserID;
    const id = this.props.userCredential.data.ID;
    if(this.state.netConnection) {
      if(this.state.fromDate !== '' && this.state.toDate !== '') {
        // this.props.dispatch({
        //   type: 'LOADER',
        //   payload: true,
        // });
        let data = {
          ID: this.state.Id,
          User_ID : value,
          From_Date: this.state.fromDate,
          To_Date: this.state.toDate,
          Reason : this.state.leaveReason,
          LeaveType : Helper.reasonType(this.state.leaveTypeData.toString().toUpperCase()),
        }
        if(this.uploadedFileText() !== '' && this.uploadedFileText() !== null) {
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
    let { params } = this.props.navigation.state;
    if(params.leaveDate !== undefined && index === 0) {
      return "Edit";
    } else {
      return data
    }
  }

  editSubmitToggle(data) {
    let { params } = this.props.navigation.state;
    console.log("=============testing===========");
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
      <Row style={{paddingVertical: 30, justifyContent: 'space-between', paddingBottom: 200 }}>
        {leaveApplyButton.map((data, i) => {
          return (
            <Button
            key={i}
            buttonTextStyle={styles.buttonTextStyle}
            text={this.applyButtonText(data.button, i)}
            style={data.id === 1 ? styles.buttonSubmitStyle: styles.buttonCancelStyle}
            onPress={() => {data.id === 1 ? this.editSubmitToggle(data.button) : this.onCancelPress()}}
            />
          )
        })}
      </Row>
    )
  }

  onBrowsePress() {
    let id = this.state.Id;
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      try {
        if(res !== undefined) {
          if(res.fileName !== undefined && res.fileName !== null) {
            this.setState({ uploadFileDetails: res})
            console.log("res=============", res);
            let data = new FormData();
            data.append('resource', {
              name: res.fileName,
              uri: res.uri, type: res.type
            });
            data.append('id', id)
            this.props.dispatch({
              type: 'UPDATE_DOC',
              payload: data
            })
            console.log("data****onBrowsePress", data);
          }
        }
      } catch(e) {
        console.log("exception", e);
      }
    });
  }

  uploadedFileText() {
    if(this.state.uploadFileDetails !== '' && this.state.uploadFileDetails !== null) {
      if(this.state.uploadFileDetails.fileName !== undefined && this.state.uploadFileDetails.fileName !== null) {
        return this.state.uploadFileDetails.fileName;
      }
    } else {
      return "";
    }
  }

  uploadFile() {
    return (
      <Row>
        <Col size={30}>
          <Text style={styles.textColor}>UploadFile</Text>
        </Col>
        <Col size={70} style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            buttonTextStyle={{color: '#000'}}
            text={'Browse..'}
            style={styles.browserStyle}
            onPress={() => this.onBrowsePress()}
          />
          <Text style={{paddingLeft: 10}}>{this.uploadedFileText()}</Text>
        </Col>
      </Row>
    )
  }

  leaveApplyField() {
    let { leaveTypeShow, managerShow } = this.state;
    return (
      <View>
        <View style={{position: 'relative'}}>
          {this.leaveType()}
        </View>
        {this.leaveDuration()}
        {this.reasonToLeave()}
        {this.uploadFile()}
        {/*<View style={{position: 'relative'}}>
          {this.reportedTo()}
        </View>*/}
        {this.applyButton()}
      </View>
    )
  }

  render() {
    console.log("leaveDate$$render",this.props.navigation.state.params);
    const loader = this.props.loading.loader !== undefined ? false : this.props.loading.loader;
    return (
        <View style={styles.container}>
          <StatusBar
             hidden={true}
           />
          <Header
            headerContainer={styles.headerContainerStyle}
            headerTextStyle={styles.headerTextStyle}
            headerLeft={{padding: 10}}
            notificationCount={this.props.notificationCount.notification}
            onLeftIconClick={() => this.openControlPanel()}
            onRightIconClick={() => this.setState({ search : !this.state.search})}
            onRightIconFirstClick={() => Helper.navigateToPage(this, 'Notifications',{ counterNo: this.props.notificationCount.notification})}
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
                { loader && <ActivityIndicator
                 style={styles.activityStyle}
                 size="large"
                 color={Common.loginButton}
                /> }
              </View>
          </Drawer>
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
    notificationCount: state.notificationCount,
  });

  export default connect(mapStateToProps)(MyJobs);
