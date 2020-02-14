import React, { Component } from 'react';
import { View, Text, Animated, Image, AsyncStorage, StatusBar, ToastAndroid, BackHandler, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { NetworkInfo } from 'react-native-network-info';
import WifiManager from 'react-native-wifi';
import * as Common from '../../common/common';
import * as Helper from '../../common/helper';
import * as Constant from '../../common/constant';
import styles from './styles';

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageAnimX: new Animated.Value(30),
      imageAnimY: new Animated.Value(20),
      logoTextAnim: new Animated.Value(0),
      animationComplete: false,
      ssid: '',
      defaultGateway: ''
    }
    this.requestWifiPermission();
  }

  async requestWifiPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,

        {
          'title': 'Wifi Permission',
          'message': 'Wifi permission ' +
                     'so you can access wifi data.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can access the wifi ssid")
        // WifiManager.getCurrentWifiSSID()
        // .then((ssid) => {
        //     console.log("Your current connected wifi SSID is " + ssid)
        //     this.setState({ ssid })
        //     // this.props.dispatch({
        //     //   type: 'SET_WIFI_SSID',
        //     //   payload: ssid,
        //     // });
        // }, () => {
        //     console.log('Cannot get current SSID!')
        // })

        NetworkInfo.getSSID(ssid => {
          console.log("=============ssid==========");
          console.log(ssid);
          // this.setState({ ssid })
        });

        NetworkInfo.getIPAddress(ip => {
          console.log("ip");
          console.log(ip);
        });

        // Get IPv4 IP
        NetworkInfo.getIPV4Address(ipv4 => {
          console.log("ipv4");
          let defaultGateway = ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1';
          console.log(ipv4.split('.')[0]+'.'+ipv4.split('.')[1]+'.'+ipv4.split('.')[2]+'.1');
          this.setState({ defaultGateway })
        });


        NetworkInfo.getBSSID(ssid => {
          console.log("ssid");
          console.log(ssid);
        });

        // Get Broadcast
        // NetworkInfo.getBroadcast(address => {
        //   console.log("address");
        //   console.log(address.toString());
        // });

      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentWillMount() {
    // WifiManager.getCurrentWifiSSID()
    // .then((ssid) => {
    //     console.log("Your current connected wifi SSID is " + ssid)
    //     this.setState({ ssid })
    //     // this.props.dispatch({
    //     //   type: 'SET_WIFI_SSID',
    //     //   payload: ssid,
    //     // });
    // }, () => {
    //     console.log('Cannot get current SSID!')
    // })
    Animated.timing(
      this.state.imageAnimX,
      {
        toValue: Common.deviceWidth / 1.7,
        duration: 3000,
      }
    ).start();
    Animated.timing(
      this.state.imageAnimY,
      {
        toValue: Common.deviceWidth / 2.6,
        duration: 3000,
      }
    ).start();
  }

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
       if (value !== null && value !== '' && value !== undefined) {
        this.props.dispatch({
          type: 'SET_USER_CREDENTIAL',
          payload: JSON.parse(value),
        });
      } 
    });
    
    AsyncStorage.getItem('userLogin').then((value) => {
      // if (value !== null && value !== '' && value !== undefined) {
      //   this.props.dispatch({
      //     type: 'SET_USER_CREDENTIAL',
      //     payload: JSON.parse(value),
      //   });
      if(value == 'true'){
        setTimeout(() => {
          // Helper.resetNavigation(this, 'Dashboard');
          // if(this.state.ssid === Constant.wiredssid && this.state.defaultGateway === Constant.defaultGatewayId) {
          if(this.state.defaultGateway === Constant.defaultGatewayId) {
            Helper.resetNavigation(this, 'Dashboard');
          } else {
            ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
            // BackHandler.exitApp();
            Helper.resetNavigation(this, 'Dashboard');
          }
        }, 3800);
      } else {
        setTimeout(() => {


          // if(this.state.ssid === Constant.wiredssid && this.state.defaultGateway === Constant.defaultGatewayId) {
          if(this.state.defaultGateway === Constant.defaultGatewayId) {
            Helper.resetNavigation(this, 'Login');
          } else {
            ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
            // BackHandler.exitApp();
            Helper.resetNavigation(this, 'Login');

          }
          // Helper.resetNavigation(this, "Login");
          // if(this.state.ssid === Constant.wiredssid) {
          //   Helper.resetNavigation(this, "Login");
          // } else {
          //   ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
          //   BackHandler.exitApp();
          // }
        }, 3800);
      }
    }).done();
    setTimeout(() => {
      this.setState({animationComplete: true})
      Animated.timing(
        this.state.logoTextAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, 3000)

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           hidden={true}
         />
        <Animated.Image
          source={this.state.animationComplete ? Constant.darkLogo: Constant.greyLogo}
          style={{width: this.state.imageAnimX, height: this.state.imageAnimY}}
        />
        {this.state.animationComplete &&
          <Animated.View
            style={[{opacity: this.state.logoTextAnim}, styles.famText]}
          >
            <Image
              fadeDuration={300}
              source={Constant.famLogo}
            />
          </Animated.View>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SplashScreen);
