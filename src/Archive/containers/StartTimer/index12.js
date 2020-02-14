import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import formatTime from 'minutes-seconds-milliseconds';
import moment from 'moment'
import { Row, Col, Grid } from 'native-base'
import Drawer from 'react-native-drawer'
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './styles';
import Button from '../../component/Button';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, myJobTitle } from '../../common/constant';
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
      search: false,
      drawerOpen: false,
      running : false,
      startTime : null,
      timeElapsed : null,
      listItem: [],
      timerShow: "00:00:00"
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
          title={this.props.navigation.state.params.jobName}
          boldShow={true}
          name="calendar"
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
                <Text style={styles.timerShowText}>{this.state.timeElapsed !== null ? moment(this.state.timeElapsed).format('hh:mm:ss') : this.state.timerShow}</Text>
              </View>
            </View>
          </View>
          {this.footer()}
        </View>
      </View>
    )
  }

  jobTaskTracking = (jobStatus) => {
    let { taskId, jobId, assignToId } = this.props.navigation.state.params;
    const value = this.props.userCredential.data.UserID;
    const userId = this.props.userCredential.data.ID;
    const dataValue = {"Task_ID": taskId,"User_ID": userId,"TrackingDatetime": moment().format('YYYY-MM-DD hh:mm'),"WorkHours": moment(this.state.timeElapsed).format('hh:mm'),"TaskStatus": jobStatus}
    const valueTask = {"Task_ID":"0","Job_ID":jobId,AssignTo: assignToId,AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
    this.props.dispatch({
      type: 'TASK_TRACKING_DETAILS',
      payload: dataValue,
      id: value
    });

    this.props.dispatch({
      type: 'TASK_LIST',
      payload: valueTask,
      id: value
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
      this.jobTaskTracking("Start");
      this.setState({
        startTime: new Date()
      });

      // if (this.state.running) {
      //   clearInterval(this.interval);
      //   this.setState({running : false});
      //   return
      // }
      this.interval = setInterval(() => {
       this.setState({
         timeElapsed : new Date() - this.state.startTime,
         running : true
       });
     }, 1000);
  }

  onPause = () => {
      this.jobTaskTracking("Pause");
      clearInterval(this.interval);
      this.setState({running : false});
  }

  onResume = () => {
    this.jobTaskTracking("Resume");
    if(!this.state.running) {
      this.setState({ startTime: new Date() - this.state.timeElapsed })
      this.interval = setInterval(() => {
       this.setState({
         timeElapsed : new Date() - this.state.startTime,
         running : true
       });
      }, 10);
    }
  }

  onStop = () => {
    this.jobTaskTracking("Stop");
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running : false});
    }
  }

  footer() {
    return (
      <View style={styles.footer}>
        <Grid>
          <Row>
            <Col style={styles.timeValue} onPress={this.state.running ? this.onPause : this.onStart}>
              <Icons name={this.state.running ? 'pause-circle-outline' : 'play-circle-outline'} color="#000"/>
              <Text style={styles.buttonValue}>{this.state.running ? 'PAUSE' : 'START'}</Text>
            </Col>
            <Col style={styles.timeValue} onPress={() => this.onResume()}>
              <Icons name="pause-circle-outline" color="#000"/>
              <Text style={styles.buttonValue}>RESUME</Text>
            </Col>
          </Row>
          <Row>
          <Col style={styles.timeValue} onPress={() => this.onStop()}>
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
            onLeftIconClick={() => this.openControlPanel()}
            onRightIconClick={() => this.setState({ search : !this.state.search})}
            onRightIconFirstClick={() => this.setState({ notification : !this.state.notification})}
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
            content={<SideMenu {...this.props} />}
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
  });

  export default connect(mapStateToProps)(StartTimer);
