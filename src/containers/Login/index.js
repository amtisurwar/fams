import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text,
  Image,
  Keyboard,
  ScrollView,
  ToastAndroid,
  NetInfo,
  Alert,
  BackHandler,
  AsyncStorage,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import fetch from 'cross-fetch';
import { connect } from 'react-redux';
import WifiManager from 'react-native-wifi';
import TouchID from "react-native-touch-id";
import store from '../../redux/configureStore';
import DeviceInfo from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';
import * as Common from '../../common/common';
import * as Helper from '../../common/helper';
import styles from './styles';
import Header from '../../component/Header';
import InputField from '../../component/InputField';
import Button from '../../component/Button';
import DialogInput from 'react-native-dialog-input';

import { logInTitle, logIn, logInCaption, terms, privacyPolicy, and, termsUse, logInEntry, forgot, sentOtpMessage, otpScreenTitle, resend, logoImage, bgImage, login, welcomeMsg, wiredssid, defaultGatewayId } from '../../common/constant';

const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      otp: '',
      firstLogin: true,
      isDialogVisible: false,
      resendClick: false,
      validityOtp: false,
      validityDevice: true,
      biometryType: false,
      showOtp: false,
      loading: false,
      networkAvailable: false
    }
  }


  handlePress = () => {              // User presses the "Login using Touch ID" button

    Keychain.getGenericPassword()   // Retrieve the credentials from the keychain
      .then(credentials => {
        const { username, password } = credentials;

        // Prompt the user to authenticate with Touch ID.
        // You can display the username in the prompt
        TouchID.authenticate(`to login with username "${username}"`)
          .then(() => {

            // If Touch ID authentication is successful, call the `login` api
            login(username, password)
              .then(() => {
                // Handle login success
              })
              .catch(error => {
                if (error === 'INVALID_CREDENTIALS') {
                  // The keychain contained invalid credentials :(
                  // We need to clear the keychain and the user will have to sign in manually
                  Keychain.resetGenericPassword();
                }
              })
          });
      });
  }

  onButtonPress() {
    Keyboard.dismiss();
    const { email, password, regIdToken, otp } = this.state;
    const value = {
      "UserName": email,
      "Password": password,
      "RememberMe": "true",
      "Deviceid": DeviceInfo.getUniqueID(),
      "RegId": regIdToken
    }
    const otpValue = {
      "emailid": email,
      "otp": this.state.otp,
      "userid": ""

    }
    this.setState({ resendClick: false });
    if (this.state.showOtp && this.state.otp == '') {
      ToastAndroid.show('Enter OTP', ToastAndroid.SHORT);
    }
    else {
      if (email !== '' || password !== '') {
        console.log(emailRegex.test(email));
        // if (!emailRegex.test(email)) {
        if (this.state.networkAvailable) {
          this.setState({ loading: true })
          if (!this.state.otp) {
            this.props.dispatch({
              type: 'GET_OTP',
              payload: value
            });
          }
          if (this.state.otp) {
            this.props.dispatch({
              type: 'VALIDATE_OTP',
              payload: otpValue
            });
          }
          // if(){
          //   // AsyncStorage.setItem('userLogin', JSON.stringify(true));
          // this.setState({ loading: true })

          // AsyncStorage.getItem('userData').then((valueData) => {
          //   console.log("==================");
          //   console.log("valueData", valueData);

          //   if (valueData === null || valueData === undefined) {
          //     console.log("222", valueData);
          //   } else {
          //     console.log("3333", valueData);
          //   }
          // }).done();
          // }



          // Keychain.setGenericPassword(email, password)
        } else {
          ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
        }
        // } else {
        //   ToastAndroid.show('Enter valid email address', ToastAndroid.SHORT);
        // }
      } else {
        ToastAndroid.show('Enter your credentials', ToastAndroid.SHORT);
      }
    }
  }
  resendOtp = () => {
    const { email, password, regIdToken, otp } = this.state;
    const value = {
      "UserName": email,
      "Password": password,
      "RememberMe": "true",
      "Deviceid": DeviceInfo.getUniqueID(),
      "RegId": regIdToken
    }
    if (this.state.showOtp) {
      this.props.dispatch({
        type: 'GET_OTP',
        payload: value
      });
      this.setState({ resendClick: true });
    }
    else {
      console.log('Forgot passowrd click');
    }
  }
  forgetPassword = () => {
    console.log('Forgot passowrd');
    this.setState({ isDialogVisible: true });
  }

  componentDidMount() {
    TouchID.isSupported()
      .then(biometryType => {
        console.log("biometryType", biometryType);
        this.setState({ biometryType });
      })
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ networkAvailable: true })
      }
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({ showOtp: false, otp: '' });
      return true;
    });
    AsyncStorage.getItem('userData').then((value) => {
      if (value !== null && value !== undefined) {
        this.state.firstLogin = false;
      }
      else {
        this.state.firstLogin = true;
      }
    });
    AsyncStorage.getItem('deviceToken').then((value) => {
      if (value !== null && value !== undefined) {
        this.setState({ regIdToken: value })
      }
    }).done();


    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  // _handleConnectionChange = (isConnected) => {
  //   if(isConnected) {
  //     this.setState({ networkAvailable: true})
  //   } else {
  //     this.setState({ networkAvailable: false})
  //   }
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
    if (isConnected) {
      this.setState({ networkAvailable: true })
      NetworkInfo.getIPV4Address(ipv4 => {
        console.log("ipv4");
        defaultGateway = ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1';
        console.log(ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1');
      });
      NetworkInfo.getSSID(ssid => {
        ssid = ssid;
      });
      // if(ssid !== wiredssid && defaultGateway === defaultGatewayId) {
      if (defaultGateway !== defaultGatewayId) {
        // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
        //  ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      }
    } else {
      this.setState({ networkAvailable: false }, () => {
        ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      })
      // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };

  checkOtp = (valueData) => {
    this.setState({ otp: valueData });
  }
  
  sendInput = (inputID) => {
    console.log(inputID)
    if (emailRegex.test(inputID) === true) {
      fetch('http://fams.demoappstore.com/cardealer/ForgotPassword?EmailId=' + inputID, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.StatusCode == "200") {
            this.setState({ isDialogVisible: false })
            ToastAndroid.show("Please check mail to reset password", ToastAndroid.SHORT);
          }
          else {
            ToastAndroid.show("User ID doesn't exits", ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          ToastAndroid.show("An Error occured", ToastAndroid.SHORT);
        });
    }
    else {
      ToastAndroid.show("Enter valid User ID", ToastAndroid.SHORT);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { email, password, regIdToken, otp } = this.state;
    const deviceValidValue = {
      "UserName": email,
      "Password": password,
      "RememberMe": "true",
      "Deviceid": DeviceInfo.getUniqueID(),
      "RegId": regIdToken
    }
    const { loginData, getOtp, validateOtp } = nextProps;
    this.setState({ loading: false })

    if (this.state.firstLogin === true) {
      if (!this.state.showOtp) {
        console.log("StatusCOde", getOtp.getOtp.StatusCode);
        if (getOtp.getOtp.StatusCode === '200') {
          console.log("StatusCOde", getOtp.getOtp.StatusCode);
          this.setState({
            validityOtp: true,
            showOtp: true
          })
        }
        else {
          ToastAndroid.show(getOtp.getOtp.Message, ToastAndroid.SHORT);
        }
      }
      if (this.state.showOtp && this.state.validityOtp) {
        if (validateOtp.validateOtp.StatusCode === '200') {
          console.log("validationData", validateOtp);
          store.dispatch({
            type: 'USER_LOGIN',
            payload: deviceValidValue,
          });

          // // this.props.navigation.navigate('Dashboard');
          // Helper.resetNavigation(this, 'Dashboard');

          // AsyncStorage.setItem('userLogin', JSON.stringify(true));
          // AsyncStorage.setItem("userData", JSON.stringify(loginData.login.Data));
        }
        else {
          if (this.state.resendClick) {
            ToastAndroid.show('OTP Resent Successfully', ToastAndroid.SHORT);
          }
          else {
            if (this.state.otp == '') {
              ToastAndroid.show('Enter OTP', ToastAndroid.SHORT);
            }
            else {
              ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);
            }
          }
        }
        if (this.state.showOtp && loginData.login.length !== 0) {
          this.setState({
            showOtp: false,
          });
          console.log(loginData);
          this.props.dispatch({
            type: 'SET_USER_CREDENTIAL',
            payload: loginData.login.Data,
          });
          Helper.resetNavigation(this, 'Dashboard');
          AsyncStorage.setItem('userLogin', JSON.stringify(true));
          AsyncStorage.setItem('userPassword', this.state.password);
          console.log(loginData.login.Data);
          AsyncStorage.setItem("userData", JSON.stringify(loginData.login.Data));
        }
      }
    }
    else {
      this.props.dispatch({
        type: 'SET_USER_CREDENTIAL',
        payload: loginData.login.Data,
      });
      Helper.resetNavigation(this, 'Dashboard');
      this.setState({
        showOtp: false
      });
      AsyncStorage.setItem('userLogin', JSON.stringify(true));
      AsyncStorage.setItem("userData", JSON.stringify(loginData.login.Data));
    }
    // if (getOtp.StatusCode === '200') {
    //   console.log("loginData", loginData);
    //   this.setState({
    //     // email: '',
    //     // password: '',
    //     showOtp: true
    //   })

    // } else {
    //   console.log("loginData", loginData);
    //   this.setState({ showOtp: false });
    //   ToastAndroid.show(loginData.login.Message, ToastAndroid.SHORT);
    // }
  }

  // loginInView() {
  //   return (
  //     logInEntry.map((data, i) => {
  //       return (
  //         <InputField
  //           key={i}
  //           index={i}
  //           secureTextEntry={i==1 ? true: false}
  //           colorUnderline="transparent"
  //           iconStyle={styles.iconStyle}
  //           inputStyle={styles.inputStyle}
  //           textInputStyle={styles.textInputStyle}
  //           text = {data.text}
  //           value = {this.state[data.value]}
  //           onChange = {(text) => this.setState({[data.value]:text})}
  //           iconName = {data.icon}
  //         />
  //       )
  //     }
  //   )
  //   )
  // }
  loginInView() {
    return (
      <View style={styles.loginView}>
        <InputField
          secureTextEntry={false}
          colorUnderline="transparent"
          iconStyle={styles.iconStyle}
          inputStyle={styles.inputStyle}
          textInputStyle={styles.textInputStyle}
          text={'User ID'}
          value={this.state.email}
          onChange={(text) => this.setState({ email: text })}
          iconName={'md-person'}
        />
        {/* {this.state.biometryType && */}
        <InputField
          secureTextEntry={true}
          colorUnderline="transparent"
          iconStyle={styles.iconStyle}
          inputStyle={styles.inputStyle}
          textInputStyle={styles.textInputStyle}
          text={'Password'}
          value={this.state.password}
          onChange={(text) => this.setState({ password: text })}
          iconName={'ios-unlock'}
        />
        {/* } */}



      </View>
    )
  }
  otpView = () => {
    if (this.state.showOtp) {
      return (
        <View style={styles.otpInput}>
          <InputField
            secureTextEntry={false}
            colorUnderline="transparent"
            iconStyle={styles.iconStyle}
            inputStyle={styles.inputStyle}
            textInputStyle={styles.textInputStyle}
            maxLength={6}
            keyboardType="numeric"
            text={'One Time Password'}
            value={this.state.otp}
            onChange={(value) => this.checkOtp(value)}
            iconName={'ios-unlock'}

          />
        </View>
      )
    }
    else {
      return null
    }

  }
  forgetPasswordView = () => {
    return (
      <View>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Forgot Password"}
          message={"Enter valid registered UserID"}
          hintInput={"Enter UserID"}
          submitInput={(inputText) => { this.sendInput(inputText) }}
          closeDialog={() => { this.setState({ isDialogVisible: false }) }}>
        </DialogInput>
      </View>
    )
  }

  clickHandler() {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
        // Alert.alert('TouchID not supported');
      });
  }

  onBiometricLogin = () => { }

  body() {
    var showLoginWithId = true;
    AsyncStorage.getItem('userData').then((value) => {
      if (value !== null && value !== undefined) {
        this.showLoginWithId = false;
      }
      else {
        this.showLoginWithId = true;
      }
    });
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.body} pointerEvents={this.state.loading ? "none" : "auto"} opacity={this.state.loading ? 0.4 : 1}>
        <View style={styles.topBar}>
        </View>
        <View style={styles.logInTitle}>
          <Image source={logoImage} style={styles.imageLogo} />
        </View>
        <View>
          <View style={styles.logInViewStyle}>
            <View>
              <Text style={styles.welcomeMsgText}>{this.state.showOtp ? otpScreenTitle : welcomeMsg}</Text>
              <Text style={styles.sendOtpMsgText} > {this.state.showOtp && sentOtpMessage}</Text>
            </View>
            {this.showLoginWithId && !this.state.showOtp ? this.loginInView() : this.otpView()}
            {this.showLoginWithId ? <Button
              buttonTextStyle={styles.buttonTextStyle}
              text={this.state.showOtp ? 'SUBMIT' : 'CONTINUE'}
              style={styles.buttonStyle}
              onPress={this.onButtonPress.bind(this)}
            />
              : null}
          </View>
          {this.state.biometryType && !this.state.firstLogin &&
            <TouchableHighlight
              style={styles.btn}
              onPress={this.clickHandler}
              underlayColor="#0380BE"
              activeOpacity={1}
            >
              <Text style={{
                color: 'blue',
              }}>
                {`Authenticate with touch id`}
              </Text>
            </TouchableHighlight>
          }

          <View style={styles.termsConditionStyle}>
            <TouchableOpacity onPress={() => {
              if (this.state.showOtp) {
                this.resendOtp()
              }
              else {
                this.forgetPassword()
              }
            }}>
              <Text style={styles.forgotText}>{this.state.showOtp ? resend : forgot}</Text>
            </TouchableOpacity>
          </View>
          {this.state.isDialogVisible ? this.forgetPasswordView() : null}
        </View>
      </ScrollView>

    )
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={{ width: '100%', height: '100%', flex: 1 }}>
        <StatusBar
          hidden={true}
        />
        {this.body()}
        {this.state.loading && <ActivityIndicator
          style={styles.activityStyle}
          size="large"
          color={Common.loginButton}
        />}
      </ImageBackground>
    )
  }
}
const mapStateToProps = state => ({
  loginData: state.loginData,
  getOtp: state.getOtp,
  validateOtp: state.validateOtp,
  validateDevice: state.validateDevice
});


function authenticate() {
  return TouchID.authenticate()
    .then(success => {
      AsyncStorage.getItem('userData').then((userDataValue) => {
        var self = this;
        if (userDataValue !== null && userDataValue !== undefined) {
          AsyncStorage.getItem('deviceToken').then((deviceToken) => {
            if (deviceToken !== null && deviceToken !== '' && deviceToken !== undefined) {
              userDataValue = JSON.parse(userDataValue);
              AsyncStorage.getItem('userPassword').then((passwordValue) => {
                const loginValues = {
                  "UserName": userDataValue.EmailID,
                  "Password": passwordValue,
                  "RememberMe": "true",
                  "Deviceid": DeviceInfo.getUniqueID(),
                  "RegId": deviceToken
                }
                console.log(loginValues);
                store.dispatch({
                  type: 'USER_LOGIN',
                  payload: loginValues
                });
                ToastAndroid.show('Authenticated Successfully', ToastAndroid.SHORT);
              });
            }
            else {
              ToastAndroid.show('Device Error', ToastAndroid.SHORT);
            }

          });

        } else {
          ToastAndroid.show('Its first login so please use userId & password', ToastAndroid.SHORT);
        }
      }).done();

    })
    .catch(error => {
      console.log(error)
      // Alert.alert(error.message);
    });
}


export default connect(mapStateToProps)(Login);
