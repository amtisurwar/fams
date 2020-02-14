import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  FlatList,
  NetInfo,
  ScrollView,
  ToastAndroid,
  BackHandler,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import { NetworkInfo } from 'react-native-network-info';

import WifiManager from 'react-native-wifi';
import { connect } from 'react-redux';
import FCM from "react-native-fcm";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import Button from '../../component/Button';
import PaginationBox from '../../component/PaginationBox';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, myNotificationTitle, notificationData, defaultGatewayId, wiredssid } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

let paginationValue = 0;
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      listItem: [],
      loaderVisible: false
    }
  }

  componentWillMount() {
    let { counterNo } = this.props.navigation.state.params;
    console.log("counterNo", counterNo);
    this.setState({ counterNo })
  }

  componentDidMount() {
    const value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'NOTIFICATION_COUNT',
      payload: "0"
    });
    this.props.dispatch({
      type: 'GET_NOTIFICATIONS',
      payload: value
    });
    this.setState({ loaderVisible: true })
    FCM.setBadgeNumber(0);
    FCM.removeAllDeliveredNotifications();
    // FCM.setBadgeNumber(0);
    // AsyncStorage.setItem("counterVariable", JSON.stringify(0));
    // this.setState({ listItem: notificationData })
    AsyncStorage.removeItem("counterVariable");
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
        // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        //ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      }
    } else {
     ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.notificationData !== this.props.notificationData) {
      if(nextProps.notificationData.notifications !== undefined) {
        if(nextProps.notificationData.notifications.StatusCode === "200") {
          this.setState({ listItem: nextProps.notificationData })
        }
      }
      this.setState({ loaderVisible: false })
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
        <View style={{flex: 9}}>
          {/*<View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>*/}
          <View style={{flex: 8}}>
            {this.dataTable()}
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
          <Text style={{textAlign: 'center'}}>{'Showing All'}</Text>
          <PaginationBox
            textItem={paginationValue}
          />
        </View>
        <View style={styles.footerButton}>
        </View>
    </View>
    )
  }

  returnColSize(value) {
    switch(value) {
      case 0:
      return 10
      case 1:
      return 15
      case 2:
      return 30
      case 3:
      return 20
      break;
      default:
      return 10
    }
  }

  myJobHeader() {
    return myNotificationTitle.map((data, i) => {
      return (
        <Col style={styles.myJobId} key={i} size={this.returnColSize(i)}>
          <Text>{data.title}</Text>
        </Col>
      )
    })
  }

  _keyExtractor = (item, index) => item.id;

  dataTable() {
    let { notifications } = this.state.listItem;
    console.log("notifications$$$dataTable", notifications);
    if(notifications !== undefined) {
      if(notifications.Data !== undefined) {
        if(notifications.Data.length) {
          console.log("1st");
            return (
              <View style={{flex: 8, backgroundColor: "#fff"}}>
                <FlatList
                  data={notifications.Data}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.showTables}
                />
              </View>
            )
        } else {
          console.log("2nd");
          return (
            <View style={{flex: 8, alignItems: 'center', padding: 20}}>
              <Text style={{color: '#d3d3d3'}}>No Notifications</Text>
            </View>
          )
        }
      }
    } else {
      console.log("3rd");
      return <View style={{flex: 8, backgroundColor: "#fff"}} />
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

  // showTables(dataValue) {
  //   return dataValue.map((data, i) => {
  //     paginationValue = i+1;
  //     return (
  //       <Row key={i} style={[styles.myJobDataStyle, {backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff'}]}>
  //         <Col style={styles.textContainerStyle} size={10}>
  //           <Text style={styles.tableContent}>{ i+1 }</Text>
  //         </Col>
  //         <Col style={styles.textContainerStyle} size={20} onPress={() => this.onJobDescriptionClick(data)}>
  //           <Text style={[styles.tableContent, styles.jobDescription]}>{data.Titile}</Text>
  //         </Col>
  //         <Col style={styles.textContainerStyle} size={30}><Text style={[styles.tableContent, {color: '#dc3545' }]}>{data.Message}</Text></Col>
  //         <Col style={styles.textContainerStyle} size={25}><Text style={styles.tableContent}>{data.CreateDate}</Text></Col>
  //       </Row>
  //     )
  //   })
  // }

  showTables = (data, item) => {
    console.log("data", data);
    console.log("item", item);
      return (
        <View key={data.index} style={[styles.myJobDataStyle, {backgroundColor: data.index < this.state.counterNo ? '#F5F5F5' : '#fff'}]}>
          <Row>
            <Col size={30}>
              <Text style={[styles.tableContent, styles.jobDescription]}>{data.item.Titile}</Text>
            </Col>
            <Col size={70} style={styles.createDateStyle}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="ios-timer" style={{alignSelf: 'center', paddingRight: 10}} size={25}/>
                <Text style={{color: '#ccc'}}>{data.item.CreateDate}</Text>
              </View>
            </Col>
          </Row>
          <Row>
            <Text style={[styles.tableContent, {paddingTop: 10, paddingBottom: 10}]}>{data.item.Message}</Text>
          </Row>
        </View>
      )
  }

  notificationClick() {
    const value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'GET_NOTIFICATIONS',
      payload: value
    });
    this.props.dispatch({
      type: 'NOTIFICATION_COUNT',
      payload: "0"
    });
    FCM.setBadgeNumber(0);
    FCM.removeAllDeliveredNotifications();
    AsyncStorage.removeItem("counterVariable");
    // AsyncStorage.setItem("counterVariable", JSON.stringify(0));
  }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
             hidden={true}
           />
          <Header
            headerContainer={styles.headerContainerStyle}
            headerTextStyle={styles.headerTextStyle}
            headerLeft={{padding: 10}}
            headerText={'Notifications'}
            notificationCount={this.props.notificationCount.notification}
            onLeftIconClick={() => this.openControlPanel()}
            onRightIconClick={() => this.setState({ search : !this.state.search})}
            onRightIconFirstClick={() => this.notificationClick()}
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
          {this.state.loaderVisible && <View style={styles.activityIndicator}>
            <ActivityIndicator
            color="#ccc"
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
    notificationCount: state.notificationCount,
    notificationData: state.notificationData,
  });

  export default connect(mapStateToProps)(Notifications);
