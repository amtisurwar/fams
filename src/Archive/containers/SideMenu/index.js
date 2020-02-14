import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Text, Image, AsyncStorage, ToastAndroid } from 'react-native';
import { View, Icon } from 'native-base';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styles from './styles';
import * as Constant from '../../common/constant';
import * as Helper from '../../common/helper';
import DrawerMenu from '../../component/DrawerMenu';
import DrawerItemView from '../../component/DrawerItemView';
import TouchID from "react-native-touch-id";


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
        this.setState({ regIdToken: value})
      }
    }).done();

    TouchID.isSupported()
      .then(biometryType => {
        console.log("biometryType", biometryType);
        this.setState({ biometryType });
      })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.logoutData !== this.props.logoutData) {
      if(nextProps.logoutData.logout !== undefined) {
        if(nextProps.logoutData.logout.Data !== undefined && nextProps.logoutData.logout.StatusCode === "200") {
          Helper.resetNavigation(this, 'Login');
          this.props.dispatch({
            type: 'SET_USER_CREDENTIAL',
            payload: [],
          });

          this.props.dispatch({
            type: 'NOTIFICATION_COUNT',
            payload: "0"
          });
          // FCM.setBadgeNumber(0);
          AsyncStorage.setItem('userLogin', JSON.stringify(false));
          if(this.state.biometryType == false){
            AsyncStorage.removeItem("userData");
          }
          // AsyncStorage.removeItem("userData");
          // AsyncStorage.removeItem("regIdToken");
          AsyncStorage.removeItem("counterVariable");
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
    console.log("dataValue$$$n2356 576",dataValue);
    if(screen === 'logout') {
      this.props.dispatch({
        type: 'LOGOUT',
        payload: dataValue,
        id: this.props.userCredential.data.UserID
      });
      AsyncStorage.setItem('userLogin', JSON.stringify(false));
    }
    this.props.navigation.navigate(screen);
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
    let imageUrl = this.props.userCredential.data.New_imgname !== undefined ? this.props.userCredential.data.New_imgname : '' ;
    // console.log("Constant.apiUrl+'Userimage/'+imageUrl",Constant.apiUrl+'/Userimage/'+imageUrl);
    return (
      <View style={styles.drawerContainer}>
          <ScrollView>
            <View style={styles.logoViewStyle}>
              <Image source={imageUrl === '' ? Constant.userLogo : {uri: Constant.apiUrl+'/Userimage/'+imageUrl}} style={styles.userLogoStyle} />
              <Text style={styles.userNameStyle}>{this.props.userCredential.data.F_Name}</Text>
            </View>
            {this.eventGuideMenu()}
          </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userCredential: state.userCredential,
  logoutData: state.logoutData,
});

export default connect(mapStateToProps)(SideMenu);
