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
import { eventList, eventListJune, mainText, logo, firstImage,secondImage,thirdImage,fourthImage,fifthImage, dashboardCardItem, wiredssid, defaultGatewayId } from '../../common/constant';
import Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu';


let counter = 0;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      latitude: '',
      longitude: '',
      listItem : []
    }
  }
  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    // const deviceID = DeviceInfo.getUniqueID();
    // const instanceID = DeviceInfo.getInstanceID();
    // const serialNo = DeviceInfo.getSerialNumber();
    const value = this.props.userCredential.data.UserID;
    AsyncStorage.getItem('counterVariable').then((value) => {
      if (value !== null && value !== '' && value !== undefined) {
        console.log("value$$Counter", value);
        this.setState({ notificationCount: value })
      }
    }).done();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    NetworkInfo.getIPV4Address(ipv4 => {
      this.gatewayId = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
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

    NetworkInfo.getSSID(ssid => {
      this.setState({ ssid })
    });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
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

  handleBackPress = () => {
    console.log("235657867654******************");
    console.log("NavigationActions", StackActions);
    // FCM.deleteInstanceId();
    // FCM.unsubscribeFromTopic();
    // FCM.cancelAllLocalNotifications();
    // const { dispatch, nav } = this.props;
    // if (nav.routes[nav.index].routeName == 'Dashboard') {
    AsyncStorage.setItem('backPressState', JSON.stringify(1))
    return false;
    // }
  };


  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
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
        ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        // BackHandler.exitApp();
      }
    } else {
      BackHandler.exitApp();
      ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };

  componentWillReceiveProps(nextProps) {

    if(nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listItem: nextProps.attendance})
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance",nextProps.attendance);
    }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false })
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }
  
  onPressTab = (punchingData) => {
    console.log(punchingData);
    let { employeeAttendance } = this.state.listItem;
    console.log(employeeAttendance);
    var matchedId = [];
    var ssidDataList = this.props.ssidList.ssidList.Data;
    console.log(this.gatewayId);
      for (let i = 0; i < ssidDataList.length ; i++){
        if(this.gatewayId == ssidDataList[i].Gateway){
          console.log('Found correct');
          matchedId.push(ssidDataList[i].Gateway);
        }
      }
      if(matchedId.length == 0){
        Alert.alert(
          'Warning Message',
          'Do you want to punch with other network ?',
          [
            {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => this.sendEmployeeAttendance(punchingData , 1)},
          ],
          { cancelable: false }
        )
      }
      else{
        this.sendEmployeeAttendance(punchingData , 0);
      }
    
    }

  sendEmployeeAttendance(dataReceived , flag){
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
    const dataValue = {"Id":"0","UserId":this.props.userCredential.data.ID.toString(), "Lat" :this.state.latitude, "Long":this.state.longitude, "Flag" : flag, "StatusDate":moment().format('MM/DD/YY HH:mm'),"StatusType": dataReceived.Value,"AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    // const dataValue = {"Id":"0","UserId":"50","StatusDate":"09/18/2018 16:29","StatusType":"1","AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    console.log("dataValue",dataValue);
   
    
    this.props.dispatch({
      type: 'POST_EMPLOYEE_ATTENDANCE',
      payload: dataValue,
      id: this.props.userCredential.data.UserID
    });
  }

  body() {
    const data = [{ key: 'Jobs', number: '01', value: 'In Progress' , image : firstImage ,color: "#f6d9b9"}, { key: 'Tasks', number: '01', image : secondImage ,value: 'In Progress' , color: '#c3e4f3' }, { key: 'Attendance',image : thirdImage ,number: '01', value: 'In Progress', color: '#e3ceef' }, { key: 'Leaves', number: '01',image : fourthImage, value: 'In Progress' , color : '#c7ebcc'}, { key: 'OverTime', number: '01', value: 'In Progress', color: '#ebc7d8',image : fifthImage }];
    return (
      <ScrollView style={styles.scrollViewClass}>
        {data.map((item, i) =>
          <View style={styles.cardStyleItem}>
            <View style={styles.upperView}>
              <View style={{ padding: 3 }}>
                <View style={{ height: 45, backgroundColor: item.color, zIndex: 999, position: 'relative' }}>
                  <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>

                    <View style={{ width: 100 }}>
                      <Image source={item.image} style={{ height: 40, width: 40, position: 'absolute', left: 22, zIndex: 99999, top: 5 }} />

                    </View>
                    <View style={{ width: 160 }}>
                      <Text style = {{fontSize : 16}}> {item.key} </Text>
                    </View>

                    <View style={{ width: 80 }}>
                      <Text style={{ textAlign: 'right', fontSize : 18, paddingRight: 0, marginRight: -4 }} > {item.number} </Text>
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
                          <Text style={{ textAlign: 'right', paddingRight: 10 , color: '#ed0808' }}> {item.number} </Text>
                        </View>
                        <View style={{ height: 30, paddingBottom: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 11, color: '#ed0808' }}> {item.value} </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ width: 80 }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                        <View style={{ height: 30, paddingTop: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10 , color: '#ff7e00'}}> {item.number} </Text>
                        </View>
                        <View style={{ height: 30, paddingBottom: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 11, color: '#ff7e00' }}> {item.value} </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ width: 80 }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'column',
                      }}>
                        <View style={{ height: 30, paddingTop: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, color: '#27b118' }}> {item.number} </Text>
                        </View>
                        <View style={{ height: 30, paddingBottom: 7 }}>
                          <Text style={{ textAlign: 'right', paddingRight: 10, color: '#27b118', fontSize: 11 }}> {item.value} </Text>
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
  _renderItem = ({ item }) => (
    <View style={styles.cardStyleItem}>
      <View style={styles.upperView}>
        <View style={{ padding: 12 }}>
          <View style={{ height: 60, backgroundColor: 'powderblue' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ width: 100 }}>
                <Image source={logo} style={{ height: 50, width: 50, position: 'absolute', top: 10 }} />
              </View>

              <View style={{ width: 120 }}>
                <Text> {item.key} </Text>
              </View>

              <View style={{ width: 120 }}>
                <Text> {item.key} </Text>
              </View>

            </View>
          </View>
          <View style={{ height: 60, backgroundColor: 'steelblue' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ width: 100 }} />

              <View style={{ width: 80 }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: 80 }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: 80 }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                  <View style={{ height: 30 }}>
                    <Text> {item.key} </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>

  );

  render() {
    let { employeeAttendance } = this.state.listItem;
    console.log(employeeAttendance === undefined)
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <Header
          headerContainer={styles.headerContainerStyle}
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
        {employeeAttendance === undefined ? null : <BottomTabBar onPressTab={this.onPressTab} punchInList = {employeeAttendance} /> }
        
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
});

export default connect(mapStateToProps)(Dashboard);
