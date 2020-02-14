import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  AppState,
  ToastAndroid,
  NetInfo,
  BackHandler,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import WifiManager from 'react-native-wifi';
import { NetworkInfo } from 'react-native-network-info';

import moment from 'moment'
import { Row, Col, Grid } from 'native-base'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import _ from  'lodash';
import styles from './styles';
import Button from '../../component/Button';
import DrawerView from '../../component/DrawerView';
import * as Helper from '../../common/helper';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, myJobTitle, defaultGatewayId, wiredssid } from '../../common/constant';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

class StartTimer extends Component {
  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onResume = this.onResume.bind(this);
    interval = 0;
    this.state = {
      appState: AppState.currentState,
      search: false,
      drawerOpen: false,
      running : false,
      onPause : false,
      hideResumeButton : false,
      onShowPause : false,
      timerStart : false,
      startTime : null,
      timeElapsed : null,
      resumeTime : null,
      taskIdValue: this.props.navigation.state.params.taskId,
      currentCheckInTime: null,
      listItem: [],
      timerShow: "00:00:00",
      totalworksec: "0",
      taskstatus:null,
      networkAvailable: false
    }
  }

  componentWillMount() {
    let { taskStatus, checkInTime, taskId } = this.props.navigation.state.params;
    this.setState({ totalworksec : this.props.navigation.state.params.totaltime_sec, taskIdValue: taskId})
    if(taskStatus=="Resumed" ||taskStatus=="Started")
    {
      checkInTime = checkInTime.replace('-','/');
      checkInTime = checkInTime.replace('-','/');
      checkInTime = checkInTime.replace('T',' ');

      let totalSec = this.getTimeInSec(new Date().getTime(), new Date(checkInTime).getTime());

      let secCalculate = parseInt(totalSec, 10) + parseInt(this.props.navigation.state.params.totaltime_sec, 10);

      this.state.taskstatus=taskStatus;
      this.state.totalworksec=secCalculate;
      this.setState({ totalworksec : secCalculate })
      this.continue();
    }

    this.state.taskstatus=taskStatus;
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected) {
        this.setState({ networkAvailable: true})
      }
    });

    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    if(nextProps.taskList !== this.props.taskList) {
      if(nextProps.taskList.taskList.Data !== undefined) {
        if(nextProps.taskList.taskList.Data.Tasklist !== undefined) {
          let getIndex = _.findIndex(nextProps.taskList.taskList.Data.Tasklist, function(o) { return o.Task_ID == self.state.taskIdValue });
          this.setState({ currentCheckInTime: nextProps.taskList.taskList.Data.Tasklist[getIndex].Check_in })
        }
      }
    }
  }



  componentWillUnmount()
  {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    AppState.removeEventListener('change', this._handleAppStateChange);
    clearInterval(this.interval);
    if(this.state.taskstatus != "Stopped" || this.state.taskstatus != "Paused")
    {
        // this.jobTaskTracking(this.state.taskstatus);
    }

  }

  // _handleConnectionChange = (isConnected) => {
  //   if(isConnected) {
  //     this.setState({ networkAvailable: true})
  //   } else {
  //     // let { taskStatus } = this.props.navigation.state.params;
  //     this.setState({ networkAvailable: false})
  //     // if(taskStatus=="Resumed" || taskStatus=="Started") {
  //     //   this.setState({ hideResumeButton: true ,taskstatus:"Paused"})
  //     //   if(this.state.running)
  //     //    {
  //     //     this.jobTaskTracking("Paused");
  //     //   }
  //     //   clearInterval(this.interval);
  //     //   this.setState({ running : false, onPause: true });
  //     // }
  //   }
  //   // let { taskId, jobId, assignToId } = this.props.navigation.state.params;
  //   // WifiManager.getCurrentWifiSSID()
  //   // .then((ssid) => {
  //   //     if(ssid !== wiredssid) {
  //   //       if(this.state.taskstatus=="Resumed" || this.state.taskstatus=="Started") {
  //   //         const dataValue = {"Task_ID": taskId,"User_ID": userId,"Job_ID":jobId,"TrackingDatetime": moment().format('YYYY-MM-DD hh:mm:ss a'),"WorkHours": this.getTimeShow(this.state.timeElapsed, this.state.startTime),"totaltime": this.state.totalworksec,"TaskStatus": jobStatus}
  //   //         const valueTask = {"Task_ID":"0","Job_ID":jobId,AssignTo: assignToId,AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
  //   //       }
  //   //       ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
  //   //       BackHandler.exitApp();
  //   //     }
  //   // }, () => {
  //   //     console.log('Cannot get current SSID!')
  //   // })
  // };

  _handleConnectionChange = (isConnected) => {
    var defaultGateway = '';
    var ssid = '';
    if(isConnected) {
      this.setState({ networkAvailable: true})
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
      this.setState({ networkAvailable: false},() => {
        BackHandler.exitApp();
      })
      ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };



  _handleAppStateChange = (nextAppState) => {
    let { taskStatus, checkInTime } = this.props.navigation.state.params;
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if(this.state.taskstatus=="Resumed" || this.state.taskstatus=="Started")
       {
         if(this.state.currentCheckInTime !== null) {
           checkInTime = this.state.currentCheckInTime;
         }
          checkInTime =   checkInTime.replace('-','/');
           checkInTime =   checkInTime.replace('-','/');
           checkInTime=   checkInTime.replace('T',' ');

         let totalSec = this.getTimeInSec(new Date().getTime(), new Date(checkInTime).getTime());


         let secCalculate = parseInt(totalSec, 10) + parseInt(this.props.navigation.state.params.totaltime_sec, 10);

         // this.state.taskstatus=taskStatus;
         this.state.totalworksec=secCalculate;
         this.setState({ totalworksec : secCalculate })
         this.continue();
       }
    } else {
      clearInterval(this.interval);
    }
    this.setState({appState: nextAppState});
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }

  onNextPress() {}

  onPreviousPress() {}

  jobTaskTracking = (jobStatus) => {
    let { taskId, jobId, assignToId } = this.props.navigation.state.params;
    const value = this.props.userCredential.data.UserID;
    const userId = this.props.userCredential.data.ID;
    const dataValue = {"Task_ID": taskId,"User_ID": userId,"Job_ID":jobId,"TrackingDatetime": moment().format('YYYY-MM-DD hh:mm:ss a'),"WorkHours": this.getTimeShow(this.state.timeElapsed, this.state.startTime),"totaltime": this.state.totalworksec,"TaskStatus": jobStatus}
    const valueTask = {"Task_ID":"0","Job_ID":jobId,AssignTo: assignToId,AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
    this.props.dispatch({
      type: 'TASK_TRACKING_DETAILS',
      payload: dataValue,
      taskPayload: valueTask,
      id: value
    });

    if(jobStatus === 'Stopped') {
      this.props.navigation.goBack(null);
    }
  }


  onStart = () => {
    if(this.state.networkAvailable) {
      this.state.onPause= true;
      this.state.taskstatus= "Started";
      this.jobTaskTracking("Started");
      this.setState({
        startTime: new Date().getTime(),
        timerStart: true
      });

      this.interval = setInterval(() => {
        this.setState({
          timeElapsed : new Date().getTime(),
          running : true
        });
      }, 1000);
    } else {
      ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
    }
  }


  continue = () => {
      this.setState({
        startTime: new Date().getTime(),
        timerStart: true
      });
      this.interval = setInterval(() => {
       this.setState({
         timeElapsed : new Date().getTime(),
         running : true
       });
     }, 1000);
  }

  onPause = () =>
  {
    if(this.state.networkAvailable) {
      //this.state.taskstatus= "Pause";
      this.setState({ hideResumeButton: true ,taskstatus:"Paused"})
      // let _timeElapsed = new Date().getTime();
      // let sec = this.getTimeInSec(_timeElapsed, this.state.startTime);
      //  totalpausetime = parseInt(totalpausetime, 10) + parseInt(sec, 10) + 1;
      if(this.state.running)
      {
        this.jobTaskTracking("Paused");
      }
      clearInterval(this.interval);
      this.setState({ running : false, onPause: true });
    } else {
      ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
    }
  }




  onResume = () =>
  {
    if(this.state.networkAvailable) {
      this.state.taskstatus= "Resumed";
      this.setState({ hideResumeButton: false, onShowPause: true })
      this.state.startTime=new Date().getTime();
      this.jobTaskTracking("Resumed");
      this.setState({ onPause: false })
      // this.setState({ startTime: new Date().getTime() - this.state.startTime })
      this.interval = setInterval(() => {
        this.setState({
          timeElapsed : new Date().getTime(),
          running : true,
        });
      }, 1000);
    } else {
      ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
    }
  }

  onStop = () =>
  {
    if(this.state.networkAvailable) {
      // this.setState({ taskstatus:"Stop" })
      this.jobTaskTracking("Stopped");
      clearInterval(this.interval);
      this.setState({running : false});
      this.state.taskstatus= "Stopped";
    } else {
      ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
    }
  }

  getTimeShow(endTime, startTime)
  {

  let totalworksec=this.state.totalworksec
  if(this.state.running) {
    totalworksec=parseInt(totalworksec,10)+1;
    // setTimeout(function(){ totalworksec=parseInt(totalworksec,10)+1 }, 1000);
  }
  this.state.totalworksec=totalworksec;
 let minutes = Math.floor(totalworksec / 60);
 let hours = Math.floor(minutes / 60);
 let days = Math.floor(hours / 24);

 hours %= 24;
 minutes %= 60;
 totalworksec %= 60;
 // if(totalworksec.toString().length < 1) { totalworksec = "0"+totalworksec}


 hours = hours.toString().length === 1 ? "0"+hours.toString() : hours;
 minutes = minutes.toString().length === 1 ? "0"+minutes.toString() : minutes;
 totalworksec = totalworksec.toString().length === 1 ? "0"+totalworksec.toString() : totalworksec;


 let ref=hours+":"+minutes+":"+totalworksec;
  return ref

  //
  //   //let difference = endTime - startTime;
  //   //let seconds = Math.floor(difference / 1000);
  // //  console.log("seconds",seconds);
  //   //if(secondsValue > 0) {
  //   //  seconds = seconds + secondsValue;
  //   //}
  //   // seconds= parseInt(seconds, 10) - parseInt(totalpausesec, 10);
  //   console.log("setseconds",seconds);
  //  let minutes = Math.floor(seconds / 60);
  //  let hours = Math.floor(minutes / 60);
  //  let days = Math.floor(hours / 24);
  //
  //  hours %= 24;
  //  minutes %= 60;
  //  seconds %= 60;
  //  let ref=hours+":"+minutes+":"+seconds;
  //   console.log("returntime",ref);
  //   return ref
  }

  getTimeInSec(endTime, startTime) {
    let difference = endTime - startTime;
    let seconds = Math.floor(difference / 1000);
    return seconds;
  }

  body() {
    return(
      <View style={{flex: 1}}>
        <DashboardTitle
          title={this.props.navigation.state.params.jobName}
          boldShow={true}
          materialIcons={true}
          name="timer"
          titleStyle={styles.titleStyle}
          titleSubPath={this.props.navigation.state.params.taskName}
        />
        <View style={{flex: 8, backgroundColor: '#fff', borderTopWidth: 0.5}}>
          <View style={{flex: 9}}>
            <View style={[{flex: 1}, styles.runningTimeText ]}>
              <Text style={styles.timerTextStyle}>{'Running Timing'}</Text>
            </View>
            <View style={[{flex: 9}, styles.timerViewPart]}>
              <View style={styles.timerShow}>
                <Text style={styles.timerShowText}>{this.getTimeShow(this.state.timeElapsed, this.state.startTime)}</Text>
              </View>
            </View>
          </View>
          {this.footer()}
        </View>
      </View>
    )
  }

  footer()
  {

    return (
      <View style={styles.footer}>
        <Grid>
          <Row>
            <Col style={styles.timeValue} onPress={this.state.running ? this.onPause : this.onStart}

             disabled={this.state.taskstatus=="Paused"}
             opacity={this.state.taskstatus=="Paused" ? 0.5: 1}>

              <Icons name={(this.state.taskstatus=="Pending") ? 'play-circle-outline' : 'pause-circle-outline'} color="#000"/>

              <Text style={styles.buttonValue}>{(this.state.taskstatus=="Pending") ? 'START' : 'PAUSE'}</Text>
            </Col>

            <Col style={styles.timeValue} onPress={() => this.onResume()}

            disabled={this.state.taskstatus!="Paused"}
            opacity={this.state.taskstatus!="Paused"? 0.5: 1}>
              <Icons name="pause-circle-outline" color="#000"/>
              <Text style={styles.buttonValue}>RESUME</Text>
            </Col>
          </Row>
          <Row>
          <Col style={styles.timeValue} onPress={() => this.onStop()}
           disabled={this.state.taskstatus=="Pending"}
           opacity={this.state.taskstatus=="Pending"? 0.5: 1}>
            <Icons name="stop-circle-outline" color="#000"/>
            <Text style={styles.buttonValue}>STOP</Text>
          </Col>
          </Row>
        </Grid>
      </View>
    )
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
              </View>
          </Drawer>
        </View>
    )
  }
}


  const mapStateToProps = state => ({
    userCredential: state.userCredential,
    jobTaskList: state.jobTaskList,
    notificationCount: state.notificationCount,
    taskList: state.taskList,
  });

  export default connect(mapStateToProps)(StartTimer);
