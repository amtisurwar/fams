import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  ScrollView,
  ToastAndroid,
  NetInfo,
  BackHandler,
  FlatList,
  Alert,
  RefreshControl,
  AsyncStorage
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';
import moment from 'moment';
import WifiManager from 'react-native-wifi';
import { NetworkInfo } from 'react-native-network-info';
import Drawer from 'react-native-drawer'
import FCM from "react-native-fcm";
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from './styles';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import CardItem from '../../component/CardItem';
import BottomTabBar from '../../component/BottomTabBar';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune, mainText, logo, firstImage, secondImage, thirdImage, fourthImage, fifthImage, dashboardCardItem, wiredssid, defaultGatewayId } from '../../common/constant';
import Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu';
import TouchID from "react-native-touch-id";


let counter = 0;
var count = 0;
const API_KEY = 'AIzaSyDJC-3OuY0yl49Jxe-N3DU6YyCT3Qv1Vkk';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      latitude: '',
      refreshing: false,
      biometryType: false,
      longitude: '',
      Address: '',
      dashboardItem: [],
      listItem: []
    }
    this.handleBackPress = this.handleBackPress;

  }
  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    // const deviceID = DeviceInfo.getUniqueID();
    // const instanceID = DeviceInfo.getInstanceID();
    // const serialNo = DeviceInfo.getSerialNumber();
    TouchID.isSupported()
      .then(biometryType => {
        console.log("biometryType", biometryType);
        this.setState({ biometryType });
      })

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else {
        AsyncStorage.getItem('lastAction').then((actionValue) => {
          if (actionValue != null) {
            let totalSecond = this.getTimeInSecond(new Date().getTime(), actionValue);
            console.log(totalSecond);
            if (totalSecond > 120) {
              this.logoutonTimeOut();
            }
            else {
              this.callMountApi();
            }
          }
          else {
            this.setLastAction(new Date().getTime());
            this.callMountApi();
          }
        });

      }

    });

    // this.props.dispatch({
    //   type: 'MY_JOBS_LIST',
    //   payload: value
    // });
  }

  // fcmMethods() {
  //   console.log("fcmmethods");
  //   AsyncStorage.setItem("fcmregistered", JSON.stringify(1));
  //   FCM.requestPermissions();
  //
  //   // This method get all notification from server side.
  //   FCM.getInitialNotification().then(notif => {
  //     console.log("INITIAL NOTIFICATION", notif)
  //   });
  //
  //   // This method give received notifications to mobile to display.
  //   this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
  //     console.log("a##^^^^^^^^^^^^^^^^^^^52", notif);
  //     if (notif && notif.local_notification) {
  //       return;
  //     }
  //     this.sendRemote(notif);
  //   });
  //
  //   // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
  //   this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
  //     console.log("TOKEN (refreshUnsubscribe)", token);
  //   });
  // }

  componentDidMount() {
    // WifiManager.getCurrentWifiSSID()
    // .then((ssid) => {
    //     console.log("Your current connected wifi SSID is " + ssid)
    //     this.setState({ ssid })
    // })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

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


    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // AsyncStorage.getItem('fcmregistered').then((value) => {
    //   console.log("value@AsyncStorage", value);
    //   if (value === null || value === undefined) {
    //     console.log("valueAsync", value);
    //     // this.fcmMethods();
    //   }
    // }).done();

    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  callMountApi = () => {

    const value = this.props.userCredential.data.UserID;
    if (value == undefined) {
      AsyncStorage.getItem('userData').then((value) => {
        if (value !== null && value !== '' && value !== undefined) {
          this.props.dispatch({
            type: 'GET_EMPLOYEE_ATTENDANCE',
            payload: JSON.parse(value).UserID
          });

          this.props.dispatch({
            type: 'DASHBOARD_DATA',
            payload: JSON.parse(value).UserID

          });
          this.props.dispatch({
            type: 'GET_ALL_SSID',
            payload: '',
            id: JSON.parse(value).UserID
          });

        }
      }).done();
    }
    else {
      this.props.dispatch({
        type: 'GET_EMPLOYEE_ATTENDANCE',
        payload: value
      });
      this.props.dispatch({
        type: 'DASHBOARD_DATA',
        payload: value

      });
      this.props.dispatch({
        type: 'GET_ALL_SSID',
        payload: '',
        id: value
      });
    }



    AsyncStorage.getItem('counterVariable').then((value) => {
      if (value !== null && value !== '' && value !== undefined) {
        console.log("value$$Counter", value);
        this.setState({ notificationCount: value })
      }
    }).done();

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

  }
  setLastAction(lastAction) {
    AsyncStorage.setItem('lastAction', JSON.stringify(lastAction));
  }

  handleBackPress = () => {
    // FCM.deleteInstanceId();
    // FCM.unsubscribeFromTopic();
    // FCM.cancelAllLocalNotifications();
    // const { dispatch, nav } = this.props;
    // if (nav.routes[nav.index].routeName == 'Dashboard') {

    // AsyncStorage.setItem('backPressState', JSON.stringify(1))
    console.log(this.props.navigation);
    if (this.props.navigation.goBack(null) == false) {
      BackHandler.exitApp();
    }
    else {
      this.props.navigation.pop(0);
    }
    return true;
    // }
  };


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    counter = 0;
    // AsyncStorage.getItem('fcmregistered').then((value) => {
    //   console.log("value@AsyncStorage%%componentWillUnmount", value);
    //   if (value === null || value === undefined) {
    //     AsyncStorage.setItem("fcmregistered", JSON.stringify(1));
    //     this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
    //       console.log("a##52", notif);
    //       if (notif && notif.local_notification) {
    //         return;
    //       }
    //       this.sendRemote(notif);
    //     });
    //   }
    // }).done();

    //this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    // this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
    //   console.log("TOKEN (refreshUnsubscribe)", token);
    // });
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  // sendRemote(notif) {
  //   console.log("this.props.notificationCount.notification",this.props.notificationCount.notification);
  //   let notification = parseInt(this.props.notificationCount.notification, 10);
  //   notification = notification + 1;
  //   FCM.setBadgeNumber(notification);
  //   AsyncStorage.setItem("counterVariable", JSON.stringify(notification));
  //   this.props.dispatch({
  //     type: 'NOTIFICATION_COUNT',
  //     payload: notification
  //   });
  //   // await FCM.requestPermissions({ badge: true, sound: true, alert: true })
  //   const title = (notif.fcm.title !== undefined) ? notif.fcm.title : notif.title;
  //   const body = (notif.fcm.body !== undefined) ? notif.fcm.body : notif.message;
  //   FCM.presentLocalNotification({
  //     title: title,
  //     body: body,
  //     priority: "high",
  //     click_action: notif.click_action,
  //     show_in_foreground: true,
  //     local: true
  //   });
  // }


  _handleConnectionChange = (isConnected) => {
    var defaultGateway = '';
    var ssid = '';
    if (isConnected) {
      NetworkInfo.getIPV4Address(ipv4 => {
        console.log("ipv4");
        defaultGateway = ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1';
        this.gatewayId = defaultGateway;
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
    if (nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listItem: nextProps.attendance })
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance", nextProps.attendance);
    }
    if (nextProps.dashboardData !== this.props.dashboardData) {
      console.log("nextProps.dashboardData", nextProps.dashboardData);
      this.setState({ dashboardItem: nextProps.dashboardData })
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance", nextProps.dashboardData);
    }

  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false })
  }

  getTimeInSecond(endTime, startTime) {
    let difference = endTime - startTime;
    let seconds = Math.floor(difference / (1000));
    return seconds;
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

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
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log("=========position===========");
    //   console.log(position);
    //   console.log("position.longitude");
    //   console.log(position.coords.longitude);
    //   console.log("position.latitude");
    //   console.log(position.coords.latitude);
    //     this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
    // }, (error) => {
    //     console.log(JSON.stringify(error))
    // }, {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    // });
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
      this.logoutonTimeOut();
    }

  }

  logoutonTimeOut = () => {

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
        // this.props.dispatch({
        //   type: 'SET_USER_CREDENTIAL',
        //   payload: [],
        // });

        // this.props.dispatch({
        //   type: 'NOTIFICATION_COUNT',
        //   payload: "0"
        // });

        // this.props.dispatch({
        //   type: 'VALIDATE_OTP',
        //   payload: []
        // });

        // this.props.dispatch({
        //   type: 'USER_LOGIN',
        //   payload: []
        // });


        // FCM.setBadgeNumber(0);
        // AsyncStorage.setItem('userLogin', JSON.stringify(false));
        // if (this.state.biometryType == false) {
        //   AsyncStorage.removeItem("userData");
        // }
        // // AsyncStorage.removeItem("userData");
        // // AsyncStorage.removeItem("regIdToken");
        // AsyncStorage.removeItem("lastAction");
        // AsyncStorage.removeItem("counterVariable");



        // this.props.navigation.navigate('logout');

      }
    }).done();

  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    var value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'DASHBOARD_DATA',
      payload: value

    });
    this.setState({ refreshing: false });
  }

  body() {
    // var dashBoarddataItem = this.props.dashboardData.Data.dashboard;
    var data = [{ key: 'Jobs', text1: 'Pending', text2: 'In Progress', text3: 'Completed', number1: '--', number2: '--', number3: '--', number: '--', value: 'In Progress', image: firstImage, color: "#f6d9b9" },
    { key: 'Tasks', text1: 'Pending', text2: 'Paused', text3: 'Stopped', number1: '--', number2: '--', number3: '--', number: '--', image: secondImage, value: 'In Progress', color: '#c3e4f3' },
    { key: 'Attendance', image: thirdImage, number1: '--', number2: '--', number3: '--', number: '--', text1: 'Absent', text2: '', text3: 'Presented', value: 'In Progress', color: '#e3ceef' },
    { key: 'Leaves', number1: '--', number2: '--', number3: '--', number: '--', image: fourthImage, text1: 'Pending', text2: '', text3: 'Approved', value: 'In Progress', color: '#c7ebcc' },
    { key: 'Overtime', number1: '--', number2: '--', number3: '--', number: '--', value: 'In Progress', text1: 'Pending', text2: '', text3: 'Approved', color: '#ebc7d8', image: fifthImage }];

    if (this.props.dashboardData == [] || this.props.dashboardData.dashboardData.Data == undefined) {
      data = data;
    }
    else {
      var dataDash = this.props.dashboardData.dashboardData.Data.dashboard;
      data = [{ key: 'Jobs', text1: 'Pending', text2: 'In Progress', text3: 'Completed', number1: dataDash.PendingJob, number2: dataDash.InProgressJob, number3: dataDash.CompletedJob, number: dataDash.TotalJob, value: 'In Progress', image: firstImage, color: "#f6d9b9" },
      { key: 'Tasks', text1: 'Pending', text2: 'Paused', text3: 'Stopped', number1: dataDash.PendingTask, number2: dataDash.PausedTask, number3: dataDash.StoppedTask, number: dataDash.TotalTask, image: secondImage, value: 'In Progress', color: '#c3e4f3' },
      { key: 'Attendance', image: thirdImage, text1: 'Absent', text2: '', text3: 'Presented', number1: dataDash.TotalAbsent, number2: '', number3: dataDash.TotalPresent, number: dataDash.PresentMonth, value: 'In Progress', color: '#e3ceef' },
      { key: 'Leaves', number1: dataDash.PendingLeave, number2: '', number3: dataDash.ApproveLeave, number: dataDash.LeaveMonth, text1: 'Pending', text2: '', text3: 'Approved', image: fourthImage, value: 'In Progress', color: '#c7ebcc' },
      { key: 'Overtime', number1: dataDash.PendingOverTime, number2: '', number3: dataDash.ApprovedOverTime, number: dataDash.PendingOverTime + dataDash.ApprovedOverTime, text1: 'Pending', text2: '', text3: 'Approved', value: 'In Progress', color: '#ebc7d8', image: fifthImage }];
    }
    return (
      <ScrollView style={styles.scrollViewClass} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />}>
        {data.map((item, i) =>
          <View style={styles.cardStyleItem} key={i}>
            <View style={styles.upperView}>
              <View style={{ padding: 3 }}>
                <View style={{ height: 45, backgroundColor: item.color, zIndex: 999, position: 'relative' }}>
                  <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>

                    <View style={{ width: 100 }}>
                      <Image source={item.image} style={{ height: 40, width: 40, position: 'absolute', left: 22, zIndex: 99999, top: 5 }} />

                    </View>
                    <View style={{ width: 160 }}>
                      <Text style={{ fontSize: 16 }}> {item.key} </Text>
                    </View>

                    <View style={{ width: 80 }}>
                      <Text style={{ textAlign: 'right', fontSize: 16, paddingRight: 0, marginRight: -4 }} > {item.number} </Text>
                    </View>

                  </View>
                </View>

                <View style={{ height: 55, backgroundColor: '#e6e6e6' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                      <View style={{ height: 60, backgroundColor: item.color, marginTop: -34, marginLeft: 10, zIndex: 1, width: 65, borderRadius: 100 }}>
                      </View>
                      <View style={{ height: 25 }}>
                      </View>
                    </View>
                    <View style={{ width: 80 }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                        <View style={{ height: 30, textAlign: 'right', paddingTop: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, color: '#ed0808' }}> {item.number1} </Text>
                        </View>
                        <View style={{ height: 30, paddingBottom: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 11, color: '#ed0808' }}> {item.text1} </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ width: 80 }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                        {item.text2 == '' ? null :
                          <View>
                            <View style={{ height: 30, paddingTop: 7 }}>
                              <Text style={{ textAlign: 'right', paddingRight: 10, color: '#ff7e00' }}> {item.number2} </Text>
                            </View>
                            <View style={{ height: 30, paddingBottom: 7 }}>
                              <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 11, color: '#ff7e00' }}> {item.text2} </Text>
                            </View>
                          </View>
                        }
                      </View>
                    </View>

                    <View style={{ width: 80 }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                        <View style={{ height: 30, paddingTop: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, color: '#27b118' }}> {item.number3} </Text>
                        </View>
                        <View style={{ height: 30, paddingBottom: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, color: '#27b118', fontSize: 11 }}> {item.text3} </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    )
  }

  // shouldComponentUpdate(nextState, nextProps) {
  //   // const differenceInData = this.state.dashboardItem !== nextProps.dashboardItem;

  //   // // const differenceInData = this.props.dashboardData !== nextProps.dashboardData;
  //   // const state = this.state !== nextState;
  //   // const props = this.props !== nextProps;
  //   return true;
  // }

  // componentWillUpdate(nextProps, nextState) {
  //     const value = this.props.userCredential.data.UserID;
  //     this.props.dispatch({
  //       type: 'DASHBOARD_DATA',
  //       payload: value
  //     });

  // }

  render() {
    var showBottomBar = false;
    let { employeeAttendance } = this.state.listItem;
    if (employeeAttendance == [] || employeeAttendance == undefined || employeeAttendance == null || employeeAttendance.message == "Network request failed") {
      showBottomBar = false;
    }
    else {
      showBottomBar = true;
    }
    console.log(employeeAttendance === undefined)
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <Header
          headerContainer={styles.headerContainerStyle}
          headerText={'Dashboard'}
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
        {/* <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        /> */}

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
        {showBottomBar ? <BottomTabBar onPressTab={this.onPressTab} punchInList={employeeAttendance} /> : null}

      </View>
    )
  }
}


const mapStateToProps = state => ({
  userCredential: state.userCredential,
  notificationCount: state.notificationCount,
  nav: state.nav,
  ssidList: state.allSsidData,
  attendance: state.employeeAttendance,
  dashboardData: state.dashboardData
});

export default connect(mapStateToProps)(Dashboard);
