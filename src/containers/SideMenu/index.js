import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Text,NetInfo, Image, AsyncStorage, ToastAndroid } from 'react-native';
import { View, Icon } from 'native-base';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import * as Constant from '../../common/constant';
import * as Helper from '../../common/helper';
import DrawerMenu from '../../component/DrawerMenu';
import DrawerItemView from '../../component/DrawerItemView';
import TouchID from "react-native-touch-id";
import FCM from "react-native-fcm";


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      expand: false,
      loginPressed: false,
      accessToken: '',
      biometryType: false
    };
    this.navigateTo = this.navigateTo.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('deviceToken').then((value) => {
      if (value !== null && value !== '' && value !== undefined) {
        this.setState({ regIdToken: value })
      }
    }).done();

    TouchID.isSupported()
      .then(biometryType => {
        console.log("biometryType", biometryType);
        this.setState({ biometryType });
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutData !== this.props.logoutData) {
      if (nextProps.logoutData.logout !== undefined) {
        if (nextProps.logoutData.logout.Data !== undefined && nextProps.logoutData.logout.StatusCode === "200") {
          if (nextProps.userCredential.data.length == 0 && nextProps.validateOtp.validateOtp.length == 0 && nextProps.notificationCount.notification == 0 && nextProps.loginData.login.length == 0) {
           
            FCM.setBadgeNumber(0);
            AsyncStorage.setItem('userLogin', JSON.stringify(false));
            if (this.state.biometryType == false) {
              AsyncStorage.removeItem("userData");
            }
            // AsyncStorage.removeItem("userData");
            // AsyncStorage.removeItem("regIdToken");
            AsyncStorage.removeItem("lastAction");
            AsyncStorage.removeItem("counterVariable");
            Helper.resetNavigation(this, 'Login');
          }
        } else {
          ToastAndroid.show("Logout failed", ToastAndroid.SHORT);
        }
      }
    }
  }

  navigateTo(screen) {
    const dataValue = {
      Deviceid: DeviceInfo.getUniqueID(),
      RegId: this.state.regIdToken
    }
    console.log("dataValue$$$n2356 576", dataValue);
    if (screen === 'logout') {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if (connectionInfo.type == 'none') {
          ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
        }
        else{
          this.props.dispatch({
            type: 'LOGOUT',
            payload: dataValue,
            id: this.props.userCredential.data.UserID
          });
          this.props.dispatch({
            type: 'SET_USER_CREDENTIAL',
            payload: [],
          });
    
          this.props.dispatch({
            type: 'NOTIFICATION_COUNT',
            payload: "0"
          });
    
          this.props.dispatch({
            type: 'VALIDATE_OTP',
            payload: []
          });
    
          this.props.dispatch({
            type: 'USER_LOGIN',
            payload: []
          });
    
          // FCM.setBadgeNumber(0);
          AsyncStorage.setItem('userLogin', JSON.stringify(false));
          if (this.state.biometryType == false) {
            AsyncStorage.removeItem("userData");
          }
          // AsyncStorage.removeItem("userData");
          // AsyncStorage.removeItem("regIdToken");
          AsyncStorage.removeItem("lastAction");
          AsyncStorage.removeItem("counterVariable");
        }
      });
      
    }

    else {
      this.props.navigation.navigate(screen);
    }
    this.props.onDrawerItemClick(false);
  }

  onExpandingHeader() {
    this.setState({ clicked: !this.state.clicked });
  }

  eventGuideMenu() {
    return (
      <View>
        {this.eventGuideListItems()}
      </View>
    );
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  eventGuideListItems() {
    return (
      Constant.eventGuide.map((data, i) => (
        <DrawerMenu
          key={i}
          iconName={data.icon}
          text={data.menuOption}
          menuStyle={styles.myItemsMenuStyle}
          textStyle={styles.drawerMenuItemsText}
          onPress={() => this.navigateTo(data.screen)}
        />
      ))
    );
  }

  render() {
    let imageUrl = this.props.userCredential.data.New_imgname == undefined || this.props.userCredential.data.New_imgname == '' || this.props.userCredential.data.New_imgname == null ? '' : this.props.userCredential.data.New_imgname;
    // console.log("Constant.apiUrl+'Userimage/'+imageUrl", Constant.apiUrl + '/Userimage/' + imageUrl);
    return (
      <View style={styles.drawerContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#eee9e9', height: 125 }}>
            <View style={styles.logoViewStyle}>
              <Image source={imageUrl === '' ? Constant.userLogo : { uri: Constant.apiUrl + '/Userimage/' + imageUrl }} style={styles.userLogoStyle} />
            </View>
            <View>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                width: 165,
                alignItems: 'flex-start'
                // width : this.props.userCredential.data.F_Name.length > 10 || this.props.userCredential.data.Address > 8 ? 165 : 100
              }}>
                <View >
                  <Text style={styles.userNameStyle}>{this.props.userCredential.data.F_Name}</Text>
                </View>
                <View style={{ top: -20 }}>
                  <Text style={styles.addresNameStyle}>{this.props.userCredential.data.Address}</Text>
                </View>
              </View>
            </View>
          </View>
          {this.eventGuideMenu()}

        </ScrollView>
        <View >
          <Text style={{ textAlign: 'right', marginRight: 30, marginBottom: 5 }} > Version  {DeviceInfo.getVersion()}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userCredential: state.userCredential,
  logoutData: state.logoutData,
  loginData: state.loginData,
  validateOtp: state.validateOtp,

});

export default connect(mapStateToProps)(SideMenu);
