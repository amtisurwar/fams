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
  Alert,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import moment from 'moment';
import WifiManager from 'react-native-wifi';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import BottomTabBar from '../../component/BottomTabBar';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import Icons from 'react-native-vector-icons/EvilIcons'
import styles from './styles';
import Button from '../../component/Button';
import PunchingButton from '../../component/PunchingButton';
import PaginationBox from '../../component/PaginationBox';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, myAttendanceTitle, attendanceListResponse, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

let paginationValue = 0;
const API_KEY = 'AIzaSyDJC-3OuY0yl49Jxe-N3DU6YyCT3Qv1Vkk';
class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      showMealOut: false,
      showPunchOut: false,
      showPunchIn: true,
      puchIntime: '',
      puchOuttime: '',
      mealIntime: '',
      mealOuttime: '',
      latitude: '',
      longitude: '',
      listItem: [],
      Address: '',
      gatewayId : ''
    }
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if(connectionInfo.type == 'none'){
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else{
        const value = this.props.userCredential.data.UserID;
        NetworkInfo.getIPV4Address(ipv4 => {
          this.gatewayId = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
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
              this.setState({ Address : responseJson.results[0].formatted_address});
       })
          },
          (error) => console.log(error),
        );
        this.props.dispatch({
          type: 'GET_EMPLOYEE_ATTENDANCE',
          payload: value
        });
    
        this.props.dispatch({
          type: 'GET_ALL_SSID',
          payload: '',
          id: this.props.userCredential.data.UserID
        });
    
      }
    });
  }

  componentDidMount() {
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
          this.setState({ Address : responseJson.results[0].formatted_address});
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
    if(isConnected) {
      NetworkInfo.getIPV4Address(ipv4 => {
        console.log("ipv4");
        defaultGateway = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
        this.gatewayId = defaultGateway;
        console.log(ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1');
      });
      NetworkInfo.getSSID(ssid => {
        console.log(ssid + 'index 97')
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

    if(nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listItem: nextProps.attendance})
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance",nextProps.attendance);
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

  onPunchIn = () => {
    this.setState({ puchIntime: moment().format('LTS')})
    this.setState({ showPunchIn: false })
  }

  onMealIn = () =>  {
    this.setState({ mealIntime: moment().format('LTS')})
    this.setState({ showMealOut: true })
  }

  onMealOut = () => {
    this.setState({ mealOuttime: moment().format('LTS')})
    this.setState({ showPunchOut: true })
  }

  onPunchOut = () => {
    this.setState({ puchOuttime: moment().format('LTS'), showPunchOut: true})
  }

  showMealInButton() {
    let { showMealOut, showPunchOut } = this.state;
    return (
      <View style={{flexDirection: 'row'}}>
        {!showPunchOut ?
          <PunchingButton
          punchIn={styles.punchIn}
          textButtonStyle={styles.textButtonStyle}
          textbutton={ showMealOut ? "Meal Out": "Meal In"}
          onPress={() => this.onMealIn()}
          onPress={!showMealOut ? this.onMealIn : this.onMealOut}
        /> : null }
        { !showMealOut || showPunchOut ?
        <PunchingButton
          punchIn={styles.punchIn}
          textButtonStyle={styles.textButtonStyle}
          textbutton="Punch Out"
          onPress={() => this.onPunchOut()}
        /> : null}
      </View>
    )
  }

  // body() {
  //   let { showPunchIn } = this.state;
  //   let { employeeAttendance } = this.state.listItem;
  //   return(
  //     <View style={{flex: 1}}>
  //       <View style={styles.attendanceTitle}>
  //         <DashboardTitle
  //           title="Attendance List"
  //           name="user"
  //           titleStyle={styles.titleStyle}
  //         />
  //         <View style={styles.punchInOutStyle}>
  //           {showPunchIn ?
  //             <PunchingButton
  //             punchIn={styles.punchIn}
  //             icon="user"
  //             textbutton="Punch In"
  //             onPress={() => this.onPunchIn()}
  //           /> : this.showMealInButton()
  //         }
  //         </View>
  //       </View>
  //       <View style={{flex: 9}}>
  //         <View style={styles.myJobTitle}>
  //           {this.myJobHeader()}
  //         </View>
  //         <View style={{flex: 8}}>
  //           {this.dataTable()}
  //         </View>
  //         <View style={{flex: 1}}>
  //           {this.footer()}
  //         </View>
  //       </View>
  //     </View>
  //   )
  // }
  body() {
    let { showPunchIn } = this.state;
    let { employeeAttendance } = this.state.listItem;
    // let employeeAttendance = attendanceListResponse;
    return(
      <View style={{flex: 1}}>
        <View style={styles.attendanceTitle}>
          {/* <DashboardTitle
            title="Attendance List"
            name="calendar"
            titleStyle={styles.titleStyle}
          /> */}
          {/* <View style={styles.punchInOutStyle}>
            {this.punchInHeader(employeeAttendance)}
          </View> */}
        </View>
        <View style={{flex: 9}}>
          <View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>
          <View style={{flex: 8}}>
            {this.dataTable()}
          </View>
        </View>
      </View>
    )
  }

  punchInHeader(employeeAttendance) {
    if(employeeAttendance !== undefined) {
      if(employeeAttendance.Data !== undefined) {
        if(employeeAttendance.Data.CanApply !== undefined) {
          return employeeAttendance.Data.CanApply.map((data, i) => {
            return (
              <PunchingButton
                punchIn={styles.punchIn}
                textButtonStyle={styles.textButtonStyle}
                textbutton={data.Text}
                onPress={() => this.onButtonClick(data)}
              />
            )
          })
        }
      }
    }
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
    const dataValue = {"Id":"0","UserId":this.props.userCredential.data.ID.toString(), "Lat" :this.state.latitude, "Long":this.state.longitude,"LatLongAddress" :this.state.Address ,"Flag" : flag, "StatusDate":moment().format('MM/DD/YY HH:mm'),"StatusType": dataReceived.Value,"AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    // const dataValue = {"Id":"0","UserId":"50","StatusDate":"09/18/2018 16:29","StatusType":"1","AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    console.log("dataValue",dataValue);
   
    
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
  // , paddingRight : data.title == 'Total Time'|| data.title == 'Status' ? 24 : 15 
  shouldComponentUpdate(nextState, nextProps) {
    const differenceInData = this.state.listItem !== nextProps.listItem;
    const state = this.state !== nextState;
    const props = this.props !== nextProps;
    return differenceInData || state || props;
  }
  myJobHeader() {
    return myAttendanceTitle.map((data, i) => {
      return (
        <TouchableOpacity style={styles.myJobId} key={i}>
          <Text style={{color: '#fff' , paddingTop : 4 }}>{data.title}</Text>
         </TouchableOpacity>
      )
    })
  }


  // dataTable() {
  //   let { myJobs } = this.state.listItem;
  //   console.log("myJob$$dataTables",myJobs);
  //   if(myJobs !== undefined) {
  //     if(myJobs.Data !== undefined) {
  //       if(myJobs.Data.Joblist !== undefined && myJobs.Data.Joblist !== null) {
  //           return (
  //             <View style={{flex: 8, backgroundColor: "#fff"}}>
  //               <ScrollView>
  //                 {this.showTables(myJobs.Data.Joblist)}
  //               </ScrollView>
  //             </View>
  //           )
  //       } else {
  //         return (
  //           <View style={{flex: 8, alignItems: 'center', padding: 20}}>
  //             <Text style={{color: '#d3d3d3'}}>No Job List</Text>
  //           </View>
  //         )
  //       }
  //     }
  //   } else {
  //     return <View style={{flex: 8, backgroundColor: "#fff"}} />
  //   }
  // }

  dataTable() {
    let { employeeAttendance } = this.state.listItem;
    console.log("employeeAttendance", employeeAttendance);
    // let employeeAttendance = attendanceListResponse;
    if(employeeAttendance !== undefined) {
      if(employeeAttendance.Data !== undefined) {
        if(employeeAttendance.Data.attendenclist !== undefined && employeeAttendance.Data.attendenclist !== null) {
          if(employeeAttendance.Data.attendenclist !== undefined && employeeAttendance.Data.attendenclist !== null) {
            return (
              <View style={{flex: 8, backgroundColor: "#fff"}}>
                <ScrollView>
                  {this.showTables(employeeAttendance.Data.attendenclist)}
                </ScrollView>
              </View>
            )
          } else {
            return (
              <View style={{flex: 8, alignItems: 'center', padding: 20}}>
                <Text style={{color: '#d3d3d3'}}>No Attendance Record</Text>
              </View>
            )
          }
        }
      }
    } else {
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
  //   console.log("dataValue",dataValue);
  //   return dataValue.map((data, i) => {
  //     paginationValue = i+1;
  //     return (
  //       <Row key={i} style={[styles.myJobDataStyle, {backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff'}]}>
  //         <Col style={styles.textContainerStyle} size={25}>
  //           <Text style={styles.tableContent}>{ !this.state.Job_ID ? i+1 : (dataValue.length)-i }</Text>
  //         </Col>
  //         <Col style={styles.textContainerStyle} size={25} onPress={() => this.onJobDescriptionClick(data)}>
  //           <Text style={[styles.tableContent, styles.jobDescription]}>{data.Job_Name}</Text>
  //         </Col>
  //         <Col style={styles.textContainerStyle} size={25}><Text style={[styles.tableContent, {color: data.traking_status !== null ? Helper.getJobTextColor(data.traking_status.toUpperCase()) : '#dc3545' }]}>{data.traking_status === null ? "Pending": data.traking_status}</Text></Col>
  //         <Col style={styles.textContainerStyle} size={25}><Text style={styles.tableContent}>{data.Time !== null ? data.Time : '00:00:00'}</Text></Col>
  //       </Row>
  //     )
  //   })
  // }
  showTables(dataValue) {
    console.log("dataValue@@402",dataValue);
    return dataValue.map((data, i) => {
      return (
        <Row style={[styles.myJobDataStyle, {backgroundColor: i%2 === 0 ? '#fff': '#F5F5F5'}]}>
          <Col style={styles.textContainerStyle} size={13}>
            <Text style={styles.tableContent}>{data.Created_Date}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={20}>
            <Text style={styles.tableContent}>{data.Check_In !== "" ? data.Check_In : ""}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={20}><Text style={styles.tableContent}>{data.Meal_In !== "" ? data.Meal_In : ""}</Text></Col>
          <Col style={styles.textContainerStyle} size={20}><Text style={styles.tableContent}>{data.Meal_out !== "" ? data.Meal_out : ""}</Text></Col>
          <Col style={styles.textContainerStyle} size={20}><Text style={styles.tableContent}>{data.Check_Out !== "" ? data.Check_Out : ""}</Text></Col>
        </Row>
      )
    })
  }

  render() {
    let { employeeAttendance } = this.state.listItem;
    return (
        <View style={styles.container}>
          <StatusBar
             hidden={true}
           />
          <Header
            headerContainer={styles.headerContainerStyle}
            headerTextStyle={styles.headerTextStyle}
            headerLeft={{padding: 10}}
            headerText = {'Attendance'}
            notificationCount={this.props.notificationCount.notification}
            onLeftIconClick={() => this.openControlPanel()}
            onRightIconClick={() => this.setState({ search : !this.state.search})}
            onRightIconFirstClick={() => this.setState({ notification : !this.state.notification})}
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
          {employeeAttendance === undefined || employeeAttendance.message == "Network request failed" ? null : <BottomTabBar onPressTab={this.onPressTab} punchInList = {employeeAttendance} /> }
        </View>
    )
  }
}


  const mapStateToProps = state => ({
    jobList: state.jobList,
    ssidList: state.allSsidData,
    attendance: state.employeeAttendance,
    userCredential: state.userCredential,
    notificationCount: state.notificationCount,
  });

  export default connect(mapStateToProps)(Attendance);
