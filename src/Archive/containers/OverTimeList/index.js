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
  TouchableOpacity
} from 'react-native'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import WifiManager from 'react-native-wifi';
import { NetworkInfo } from 'react-native-network-info';

import PunchingButton from '../../component/PunchingButton';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import Button from '../../component/Button';
import PaginationBox from '../../component/PaginationBox';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, overTimeTitle, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

let paginationValue = 0;

class OverTimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      listItem: [],
    }
  }

  componentWillMount() {
    const value = this.props.userCredential.data.UserID;
    this.props.dispatch({
      type: 'OVER_TIME_LIST',
      payload: value
    });
  }

  componentDidMount() {
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
    if(nextProps.overTime !== this.props.overTime) {
      console.log("nextProps.overTime%%%%%%73", nextProps.overTime);
      this.setState({ listItem: nextProps.overTime})
    }
    // if(nextProps.leaveList !== this.props.leaveList) {
    //
    // }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }

  onNextPress() {}

  onPreviousPress() {}

  onButtonClick() {
    Helper.navigateToPage(this, 'OverTimeApply');
  }

  body() {
    return(
      <View style={{flex: 1}}>
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
        <View style={{flex: 9}}>
          <View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>
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

  shouldComponentUpdate(nextState, nextProps) {
    const differenceInData = this.state.listItem !== nextProps.listItem;
    const state = this.state !== nextState;
    const props = this.props !== nextProps;
    return differenceInData || state || props;
  }

  onPressToSort = (title) => {
    console.log("title",title);
    let { myJobs } = this.state.listItem;
    if(title === 'Time') {
      this.setState({ [title]: !this.state[title] });
      if(this.state[title]) {
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
    } else if(title === 'traking_status') {
      this.setState({ [title]: !this.state[title] });
      if(this.state[title]) {
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

    } else if(title !== 'Job_ID') {
        this.setState({ [title]: !this.state[title] });
        if(this.state[title]) {
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
        <TouchableOpacity style={styles.myJobId} key={i}>
          <Text>{data.title}</Text>
          <Icon name="ios-arrow-round-up" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'black' : 'grey') : 'grey'}/>
          <Icon name="ios-arrow-round-down" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'grey' : 'black') : 'grey'}/>
        </TouchableOpacity>
      )
    })
  }

  dataTable() {
    let { overTimeData } = this.state.listItem;
    if(overTimeData !== undefined) {
      console.log("overTimeData#$$$276", overTimeData);
      if(overTimeData.Data !== undefined) {
        if(overTimeData.Data.leavelist !== undefined && overTimeData.Data.leavelist !== null) {
            return (
              <View style={{flex: 8, backgroundColor: "#fff"}}>
                <ScrollView>
                  {this.showTables(leaveData.Data.leavelist)}
                </ScrollView>
              </View>
            )
        } else {
          return (
            <View style={{flex: 8, alignItems: 'center', padding: 20}}>
              <Text style={{color: '#d3d3d3'}}>No OverTime List</Text>
            </View>
          )
        }
      } else {
        <View style={{flex: 8, alignItems: 'center', padding: 20}}>
          <Text style={{color: '#d3d3d3'}}>No OverTime List</Text>
        </View>
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

  showTables(dataValue) {
    return dataValue.map((data, i) => {
      paginationValue = i+1;
      return (
        <Row key={i} style={[styles.myJobDataStyle, {backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff'}]}>
          <Col style={styles.textContainerStyle} size={10}>
            <Text style={styles.tableContent}>{data.LeaveType}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={60}><Text style={styles.tableContent}>{data.To_Date}</Text></Col>
          <Col style={styles.textContainerStyle} size={15}><Text style={[styles.tableContent, {color: Helper.getApprovedStatusColor(data.Status.toString().toUpperCase())}]}>{data.Status}</Text></Col>
        </Row>
      )
    })
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
    jobList: state.jobList,
    overTime: state.overTime,
    userCredential: state.userCredential,
    notificationCount: state.notificationCount,
  });

  export default connect(mapStateToProps)(OverTimeList);
