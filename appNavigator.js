import React, { Component } from 'react';
import { AsyncStorage, AppState } from 'react-native';
import { connect } from 'react-redux';

import { defaultGatewayId } from './src/common/constant';
import store from './src/redux/configureStore';

import { createStackNavigator,NavigationActions,StackActions } from 'react-navigation';
import { NetworkInfo } from 'react-native-network-info';
import SplashScreen from './src/containers/SplashScreen';
import LoginScreen from './src/containers/Login';
import DashboardScreen from './src/containers/Dashboard';
import MyJobScreen from './src/containers/MyJobs';
import AttendanceScreen from './src/containers/Attendance';
import TaskListScreen from './src/containers/TaskList';
import AllTaskScreen from './src/containers/AllTask';
import StartTimerScreen from './src/containers/StartTimer';
import LeaveApplyScreen from './src/containers/LeaveApply';
import LeaveListScreen from './src/containers/LeaveList';
import OverTimeListScreen from './src/containers/OverTimeList';
import OverTimeApplyScreen from './src/containers/OverTimeApply';

import ManagementScreen from './src/containers/ManagementScreen';
import MyBreakScreen from './src/containers/MyBreak';

export const AppNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Login: { screen: LoginScreen },
    Dashboard: { screen: DashboardScreen },
    MyJob: { screen: MyJobScreen },
    Attendance: { screen: AttendanceScreen },
    TaskList: { screen: TaskListScreen },
    StartTimer: { screen: StartTimerScreen },
    AllTask: { screen: AllTaskScreen },
    MyBreak: { screen: MyBreakScreen },
    LeaveApply: { screen: LeaveApplyScreen },
    LeaveList: { screen: LeaveListScreen },
    OverTimeList: { screen: OverTimeListScreen },
    OverTimeApply: { screen: OverTimeApplyScreen },
   
    Management: { screen: ManagementScreen },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

class AppWithNavigationState extends Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    AsyncStorage.getItem('counterVariable').then((value) => {
      if (value !== null && value !== '' && value !== undefined) {
        store.dispatch({
        //  type: 'NOTIFICATION_COUNT',
          payload: value
        });
      }
    }).done();
   // this.setUpFcm();
    // AppState.addEventListener('change', this.callbackOnAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    console.log("componentWillUnmount");
    //this.notificationListener.remove();
    //this.refreshUnsubscribe.remove();

    // AppState.removeEventListener('change', this.callbackOnAppStateChange);

  }

  _handleAppStateChange = (nextAppState) => {
    console.log("nextAppState", nextAppState);
    if (nextAppState === 'active') {

//      FCM.getBadgeNumber().then(badgeNumber => {
//        if(badgeNumber !== 0) {
//          store.dispatch({
//            type: 'NOTIFICATION_COUNT',
//            payload: badgeNumber
//          })
//        }
//      });
      console.log('App has come to the foreground!')
      // NetworkInfo.getIPV4Address(ipv4 => {
      //   console.log("ipv4");
      //   let defaultGateway = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
      //   console.log("dfgdf----sdfdf");
      //   console.log(ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1');
      //   // this.setState({ defaultGateway })
      //
      //   if(defaultGateway !== defaultGatewayId) {
      //     ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
      //     BackHandler.exitApp();
      //   }
      // });
    } else if(nextAppState === "background") {
      // console.log('OPEN AUTH SCREEN')
      console.log(this.props.userCredential.data);
      if(this.props.userCredential.data.length !== 0){
        console.log('time reseted')
        this.setLastAction(new Date().getTime());
      }

      console.log('App has come to the background!')
    }
    // this.setState({appState: nextAppState});
  }
  
  setLastAction(lastAction) {
    AsyncStorage.setItem('lastAction', JSON.stringify(lastAction));
  }

  sendRemote(notif) {
    console.log("sdgdbfgbfgb");
    console.log("store.getState", store.getState());
    let notification = parseInt(store.getState().notificationCount.notification, 10);
    notification = notification + 1;
    store.dispatch({
      type: 'NOTIFICATION_COUNT',
      payload: notification
    })
    AsyncStorage.setItem('counterVariable', JSON.stringify(notification));
    FCM.setBadgeNumber(notification);
    const title = (notif.fcm.title !== undefined) ? notif.fcm.title : notif.title;
    const body = (notif.fcm.body !== undefined) ? notif.fcm.body : notif.message;
    FCM.presentLocalNotification({
      title: title,
      body: body,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true,
    });
    // setTimeout(() => {
    //
    // }, 300);
  }


  setUpFcm() {

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)  ", token);
      AsyncStorage.setItem('deviceToken', token)
    });
    FCM.requestPermissions();

    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log("notif", notif)
    });

    // This method give received notifications to mobile to display.
    // this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
    //   console.log("a##^^^^^^^^^^^^^^^^^^^52", notif);
    //   if (notif && notif.local_notification) {
    //     return;
    //   }
    //   this.sendRemote(notif);
    // });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload
       // notif.data
       //contains data payload
       if(notif.local_notification){
        return;
      }
      if(notif.opened_from_tray){
        return;
      }
      console.log("notif%%%%",notif);
      console.log("notif%%%%",JSON.stringify(notif));
      // this.sendRemote(notif);
      // this.sendRemote(notif);
     }
   );



    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
    });
  }
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  // }
  //
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  // }

  // onBackPress = () => {
  //   const { dispatch, nav } = this.props;
  //   if (nav.routes[nav.index].routeName == 'home' || nav.routes[nav.index].routeName == 'dashboard') {
  //     return false;
  //   }
  //   dispatch(NavigationActions.back());
  //   return true;
  // };

  render() {
    return (
      <AppNavigator />
    );
  }
}
//
function mapStateToProps(state) {
  return {
    nav: state.nav,
    userCredential: state.userCredential
  };
}

function mapDispatchToProps(dispatch) {
    return({
        notificationValue: () => {dispatch(NOTIFICATION_COUNT)}
    })
}
export default connect(mapStateToProps)(AppWithNavigationState);
