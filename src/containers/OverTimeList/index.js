import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  NetInfo,
  ScrollView,
  ToastAndroid,
  BackHandler,
  RefreshControl,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from 'react-native'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import WifiManager from 'react-native-wifi';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import BottomTabBar from '../../component/BottomTabBar';
import PunchingButton from '../../component/PunchingButton';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import moment from 'moment';
import Button from '../../component/Button';
import PaginationBox from '../../component/PaginationBox';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune, mainText, logo, overTimeTitle, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

let paginationValue = 0;
const API_KEY = 'AIzaSyDJC-3OuY0yl49Jxe-N3DU6YyCT3Qv1Vkk';

class OverTimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      listItem: [],
      listAttendanceItem: [],
      latitude: '',
      refreshing: false,
      Address: '',
      longitude: '',
    }
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else {
        const value = this.props.userCredential.data.UserID;
        this.props.dispatch({
          type: 'OVER_TIME_LIST',
          payload: value
        });

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
          type: 'GET_EMPLOYEE_ATTENDANCE',
          payload: value
        });

        this.props.dispatch({
          type: 'GET_ALL_SSID',
          payload: '',
          id: value
        });
      }
    });
  }

  componentDidMount() {
    NetworkInfo.getSSID(ssid => {
      this.setState({ ssid })
    });

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

    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    paginationValue = 0;
  }

  // _handleConnectionChange = (isConnected) => {
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
        // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        //ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.overTime !== this.props.overTime) {
      console.log("nextProps.overTime%%%%%%73", nextProps.overTime);
      this.setState({ listItem: nextProps.overTime })
    }

    if (nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listAttendanceItem: nextProps.attendance })
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance", nextProps.attendance);
    }
    // if(nextProps.leaveList !== this.props.leaveList) {
    //
    // }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false })
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  onNextPress() { }

  onPreviousPress() { }

  onButtonClick() {
    Helper.navigateToPage(this, 'OverTimeApply');
  }
  onPressTab = (punchingData) => {
    console.log(punchingData);
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
      <View style={{ flex: 1 }}>
        <View style={styles.leaveListTitle}>
          <DashboardTitle
            title="Over Time"
            name="calendar"
            titleStyle={styles.titleStyle}
          />
          <View style={styles.applyLeaveButton}>
            <PunchingButton
              punchIn={styles.punchIn}
              textButtonStyle={styles.textButtonStyle}
              textbutton={'Apply Over Time'}
              onPress={() => this.onButtonClick()}
            />
          </View>
        </View>
        <View style={{ flex: 9 }}>
          <View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>
          <View style={{ flex: 8 }}>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
              {this.dataTable()}
            </ScrollView>
          </View>
          {/*<View style={{flex: 1}}>
            {this.footer()
          </View>*/}
        </View>
      </View>
    )
  }

  footer() {
    return (
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <Text style={{ textAlign: 'center' }}>{'Showing All'}</Text>
          <PaginationBox
            textItem={paginationValue}
          />
        </View>
        <View style={styles.footerButton}>
        </View>
      </View>
    )
  }

  shouldComponentUpdate(nextState, nextProps) {
    const differenceInData = this.state.listItem !== nextProps.listItem;
    const state = this.state !== nextState;
    const props = this.props !== nextProps;
    return differenceInData || state || props;
  }

  onPressToSort = (title) => {
    console.log("title", title);
    let { myJobs } = this.state.listItem;
    if (title === 'Time') {
      this.setState({ [title]: !this.state[title] });
      if (this.state[title]) {
        console.log("firstOption");
        myJobs.Data.Joblist.sort(function compare(a, b) {
          const genreA = Helper.calculateTotalSec(a[title]);
          const genreB = Helper.calculateTotalSec(b[title]);

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      } else {
        console.log("secondOption");
        myJobs.Data.Joblist.sort(function compare(a, b) {
          const genreA = Helper.calculateTotalSec(a[title]);
          const genreB = Helper.calculateTotalSec(b[title]);

          let comparison = 0;
          if (genreA > genreB) {
            comparison = -1;
          } else if (genreA < genreB) {
            comparison = 1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      }
    } else if (title === 'traking_status') {
      this.setState({ [title]: !this.state[title] });
      if (this.state[title]) {
        myJobs.Data.Joblist.sort(function compare(a, b) {
          const genreA = Helper.checkProgressList(a[title]);
          const genreB = Helper.checkProgressList(b[title]);

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      } else {
        myJobs.Data.Joblist.sort(function compare(a, b) {
          const genreA = Helper.checkProgressList(a[title]);
          const genreB = Helper.checkProgressList(b[title]);

          let comparison = 0;
          if (genreA < genreB) {
            comparison = 1;
          } else if (genreA > genreB) {
            comparison = -1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      }

    } else if (title !== 'Job_ID') {
      this.setState({ [title]: !this.state[title] });
      if (this.state[title]) {
        myJobs.Data.Joblist.sort(function compare(a, b) {
          // Use toUpperCase() to ignore character casing
          const genreA = a[title].toUpperCase();
          const genreB = b[title].toUpperCase();

          let comparison = 0;
          if (genreA > genreB) {
            comparison = 1;
          } else if (genreA < genreB) {
            comparison = -1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      } else {
        myJobs.Data.Joblist.sort(function compare(a, b) {
          // Use toUpperCase() to ignore character casing
          const genreA = a[title].toUpperCase();
          const genreB = b[title].toUpperCase();

          let comparison = 0;
          if (genreA < genreB) {
            comparison = 1;
          } else if (genreA > genreB) {
            comparison = -1;
          }
          return comparison;
        });
        this.setState({ myJobs: this.state.listItem.myJobs })
      }

    } else {
      this.setState({ [title]: !this.state[title] });
      myJobs.Data.Joblist.reverse();
      this.setState({ myJobs: this.state.listItem.myJobs })
    }
  }

  myJobHeader() {
    return overTimeTitle.map((data, i) => {
      return (
        <View style={styles.myJobId} key={i}>
          <Text style={{ color: '#fff' }}>{data.title}</Text>
        </View>
      )
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    var value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'OVER_TIME_LIST',
      payload: value

    });
    this.setState({ refreshing: false });
  }
  dataTable() {
    let { overTimeData } = this.state.listItem;
    if (overTimeData !== undefined) {
      console.log("overTimeData#$$$276", overTimeData);
      if (overTimeData.Data !== undefined) {
       // if (overTimeData.Data.leavelist !== undefined && overTimeData.Data.leavelist !== null) {
          return (
            <View style={{ flex: 8, backgroundColor: "#fff" }}>
              {this.showTables(overTimeData.Data)}
            </View>
          )
        // } else {
        //   return (
        //     <View style={{ flex: 8, alignItems: 'center', padding: 20 }}>
        //       <Text style={{ color: '#d3d3d3' }}>No OverTime List</Text>
        //     </View>
        //   )
        // }
      } else {
        <View style={{ flex: 8, alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#d3d3d3' }}>No OverTime List</Text>
        </View>
      }
    } else {
      return <View style={{ flex: 8, backgroundColor: "#fff" }} />
    }
  }

  onJobDescriptionClick = (data) => {
    const dataValue = {
      jobId: data.Job_ID,
      assignTo: data.AssignTo,
      assignBy: data.AssignBy,
      createdBy: data.CreateBy,
      assignToId: data.AssignToId,
      jobDescription: data.Job_Description,
    }
    Helper.navigateToPage(this, 'TaskList', dataValue)
  }

  showTables(dataValue) {
    return dataValue.map((data, i) => {
      paginationValue = i + 1;
      return (
        <Row key={i} style={[styles.myJobDataStyle, { backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff' }]}>
          <Col style={styles.textContainerStyle} size={10}>
            <Text style={styles.tableContent}>{data.Total_OverTime}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={18}>
            <Text style={styles.tableContent}>{data.ApplyFromdate}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={18}><Text style={styles.tableContent}>{data.ApplyTodate}</Text></Col>
          <Col style={styles.textContainerStyle} size={10}><Text style={[styles.tableContent, { color: Helper.getApprovedStatusColor((data.Status || "PENDING").toString().toUpperCase()) }]}>{data.Status || "Pending"}</Text></Col>
          <Col style={styles.textContainerStyle} size={10} onPress={() => this.navigateToLeaveApply(data)}>
            <FontAwesome5 size={20} name="edit" style={{ alignSelf: 'center', marginLeft: '40%' }} />
          </Col>
        </Row>
      )
    })
  }
  navigateToLeaveApply = (dataReceived) => {
    let checkCase = dataReceived.Status.toString().toLowerCase();
    if (checkCase !== 'approved' && checkCase !== 'rejected')
    this.props.navigation.push('OverTimeApply', { overTime: dataReceived },);
  }
  render() {
    let { employeeAttendance } = this.state.listAttendanceItem;
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <Header
          headerContainer={styles.headerContainerStyle}
          headerText={'Overtime'}
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
      </View>
    )
  }
}


const mapStateToProps = state => ({
  jobList: state.jobList,
  overTime: state.overTime,
  userCredential: state.userCredential,
  notificationCount: state.notificationCount,
  ssidList: state.allSsidData,
  attendance: state.employeeAttendance,
});

export default connect(mapStateToProps)(OverTimeList);
