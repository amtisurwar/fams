import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import FCM from "react-native-fcm";
import PushNotification from './src/component/PushNotification'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fcm_token: ""
    };
  }
  componentDidMount () {
    // FCM.requestPermissions();
    // FCM.getFCMToken().then(token => {
    //   this.setState({fcm_token:token});
    //   //update your fcm token on server.
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Firebase PushNotificcation Example</Text>
        <PushNotification />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
