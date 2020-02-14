import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  Alert,
  Modal,
  TextInput,
  NetInfo,
  ScrollView,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native'
import { Row, Col } from 'native-base'
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import Drawer from 'react-native-drawer'
import { NetworkInfo } from 'react-native-network-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import RNFetchBlob, { base64DataString } from 'react-native-fetch-blob'
import WifiManager from 'react-native-wifi';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PaginationBox from '../../component/PaginationBox';
import styles from './styles';
import Button from '../../component/Button';
import BottomTabBar from '../../component/BottomTabBar';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import InputField from '../../component/InputField';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune, mainText, logo, myJobTitle, jobDetailsTitle, commentButton, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'
import ImagePicker from 'react-native-image-picker';

let paginationValue = 0;
const API_KEY = 'AIzaSyDJC-3OuY0yl49Jxe-N3DU6YyCT3Qv1Vkk';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      listItem: [],
      modalVisible: false,
      comment: '',
      Address: '',
      uploadFileDetails: '',
      taskDetails: {},
      loaderVisible: false,
      downloadFileStart: false,
      docUpload: false,
      showIconlist: false,
      listAttendanceItem: [],
      pickedImage: '',
      Id: 0
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type == 'none') {
        ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
      }
      else {
        const { jobId, assignToId } = this.props.navigation.state.params;
        // const authentication = "2fe5dc2e-f69b-4b6c-8912-ef1bea10eeae";
        const authentication = this.props.userCredential.data.UserID;

        // const authentication = '221601b1-4c97-4226-a471-bc8e4fb26834';
        // const value = {
        //   "Task_ID":"0",
        //   "Job_ID": jobId,
        //   "AssignTo": assignTo,
        //   "AssignBy": assignBy,
        //   "CreatedBy": createdBy,
        //   "Task_Status":"0"
        // };
        // const value = {"Task_ID":"0","Job_ID":"24",AssignTo: "50",AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
        const value = { "Task_ID": "0", "Job_ID": jobId, AssignTo: assignToId, AssignBy: "0", "CreatedBy": "1", "Task_Status": "0" };
        const userIDvalue = this.props.userCredential.data.UserID;

        this.props.dispatch({
          type: 'TASK_LIST',
          payload: value,
          id: authentication
        });
        this.setState({ loaderVisible: true })

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
                this.setState({ Address: responseJson.results[0].formatted_address });
              })
          },
          (error) => console.log(error),
        );


        NetworkInfo.getIPV4Address(ipv4 => {
          this.gatewayId = ipv4.split('.')[0] + '.' + ipv4.split('.')[1] + '.' + ipv4.split('.')[2] + '.1';
        });

        this.props.dispatch({
          type: 'GET_EMPLOYEE_ATTENDANCE',
          payload: userIDvalue
        });

        this.props.dispatch({
          type: 'GET_ALL_SSID',
          payload: '',
          id: userIDvalue
        });
      }
    });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   this.setState({showIconlist : false});
    //   return true;
    // });
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
            this.setState({ Address: responseJson.results[0].formatted_address });
          })
      },
      (error) => console.log(error),
    );

  }

  componentWillUnmount() {
    paginationValue = 0;
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
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
    if (isConnected) {
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
        //ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('You are offline', ToastAndroid.SHORT);
      // ToastAndroid.show('BackHandler.exitApp();network', ToastAndroid.SHORT);
    }
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.taskList !== this.props.taskList) {
      this.setState({ listItem: nextProps.taskList, loaderVisible: false })
    }
    if (nextProps.attendance !== this.props.attendance) {
      console.log("nextProps.attendance", nextProps.attendance);
      this.setState({ listAttendanceItem: nextProps.attendance })
      // this.setState({ listItem: attendanceListResponse.attendenclist})
      console.log("nextProps.attendance", nextProps.attendance);
    }
    if (nextProps.sendTaskDoc !== this.props.sendTaskDoc) {
      console.log("next==============", nextProps.sendTaskDoc);
      if (nextProps.sendTaskDoc.sendTaskDoc !== undefined) {
        if (nextProps.sendTaskDoc.sendTaskDoc.Data === null) {
          ToastAndroid.show('Upload file less than 3 mb', ToastAndroid.SHORT);
        }
      }
    }
    if (nextProps.updateTask !== this.props.updateTask) {
      if (nextProps.updateTask.updateComment !== undefined) {
        if (nextProps.updateTask.updateComment.StatusCode !== undefined) {
          if (nextProps.updateTask.updateComment.StatusCode === '200') {
            this.setState({ modalVisible: false, comment: '', uploadFileDetails: '' })
          } else {
            ToastAndroid.show('Update failed', ToastAndroid.SHORT);
          }
        }
      }
      this.setState({ listItem: nextProps.taskList })
    }
  }

  closeControlPanel = () => {
    this.setState({ drawerOpen: false })
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  onNextPress() { }

  onPreviousPress() { }

  sendFileUrl() {
    try {
      if (this.uploadedFileText() !== '' && this.uploadedFileText() !== null) {
        if (this.props.sendTaskDoc.sendTaskDoc.Data !== null) {
          return this.props.sendTaskDoc.sendTaskDoc.Data.filename;
        } else {
          return "";
        }
      } else {
        return "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  onSubmitPress = () => {
    const { jobId, assignToId } = this.props.navigation.state.params;
    const authentication = this.props.userCredential.data.UserID;
    const value = { "Task_ID": "0", "Job_ID": jobId, AssignTo: assignToId, AssignBy: "0", "CreatedBy": "1", "Task_Status": "0" };
    const dataValue = { "Task_ID": this.state.taskDetails.Task_ID, "Comments": this.state.comment, "File": this.sendFileUrl() }
    if (this.state.comment !== '') {
      this.props.dispatch({
        type: 'UPDATE_TASK_COMMENT',
        payload: dataValue,
        id: authentication,
        taskData: value
      });
    } else {
      ToastAndroid.show('Please enter any comment', ToastAndroid.SHORT);
    }
    console.log(this.state.taskDetails);
  }

  onCancelPress = () => {
    this.setState({ modalVisible: false, uploadFileDetails: '', downloadFileStart: false })
  }

  applyButton() {
    return (
      <Row style={{ left: '110%', bottom: '10%', justifyContent: 'space-around', alignItems: 'center' }}>
        {commentButton.map((data, i) => {
          return (
            <Button
              key={i}
              buttonTextStyle={styles.buttonTextStyle}
              text={data.button}
              style={data.id === 1 ? styles.buttonSubmitStyle : styles.buttonCancelStyle}
              onPress={data.id === 1 ? this.onSubmitPress : this.onCancelPress}
            />
          )
        })}
      </Row>
    )
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.showIconlist == true) {
      this.setState({ showIconlist: false });
    }
    if (nextState.comment !== this.state.comment) {
      if (nextState.comment !== null || nextState.comment !== undefined || nextState.comment !== '') {
        if (nextState.comment.length !== undefined) {
          if (nextState.comment.length && nextState.comment.length === 200) {
            ToastAndroid.show('Comment should not more than 200 characters', ToastAndroid.SHORT);
          }
        }
      }
    }
  }

  body() {
    const { jobId, Job_Name } = this.props.navigation.state.params;
    let comments = this.state.taskDetails.Comments !== undefined ? this.state.taskDetails.Comments : '';
    return (
      <View style={{ flex: 1 }}>
        <DashboardTitle
          title={Job_Name}
          // name="tasks"
          fontAwesome={true}
          textStyle={{ color: '#fff' }}
          titleStyle={styles.titleStyle}
        />
        <View style={{ flex: 9 }}>
          <View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>
          <View style={{ flex: 8 }}>
            {this.dataTable()}
          </View>
          {/*<View style={{flex: 1}}>
            {this.footer()}
          </View>*/}
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <View style={styles.modalView}>
            <View style={styles.modalSubContainer}>
              {this.state.docUpload ? this.docModalContainer() : this.modalContainer()}
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  onBrowsePress(type) {
    let id = this.state.Id;
    var typeofDocument = type;
    if (typeofDocument == 'image') {
      typeofDocument = DocumentPickerUtil.images();
    }
    else {
      typeofDocument = DocumentPickerUtil.pdf();
    }
    DocumentPicker.show({
      filetype: [typeofDocument],
    }, (error, res) => {
      console.log("res", res);
      try {
        if (res !== undefined) {
          console.log("res", res);
          if (res.fileName !== undefined && res.fileName !== null) {
            this.setState({ uploadFileDetails: res })
            ToastAndroid.show('Attachment Saved', ToastAndroid.SHORT);
            let data = new FormData();
            data.append('resource', {
              name: res.fileName,
              uri: res.uri, type: res.type
            });
            data.append('id', id)
            this.props.dispatch({
              type: 'SEND_TASK_DOC',
              payload: data
            })
          }
        }
      } catch (e) {
        console.log("exception", e);
      }
    });
  }

  pickImageHandler = () => {
    let id = this.state.Id;
    ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res)
        this.setState({ uploadFileDetails: res });
        ToastAndroid.show('Attachment Saved', ToastAndroid.SHORT);
        let data = new FormData();

        data.append('resource', {
          name: res.fileName,
          uri: res.uri,
          // uri: 'data:image/jpeg;base64,' + res.data, 
          type: res.type
        });
        data.append('id', id)
        this.props.dispatch({
          type: 'SEND_TASK_DOC',
          payload: data
        })

      }
    });
  }

  uploadedFileText() {
    try {
      if (this.state.uploadFileDetails !== '' && this.state.uploadFileDetails !== null) {
        if (this.state.uploadFileDetails.fileName !== undefined && this.state.uploadFileDetails.fileName !== null) {
          return this.state.uploadFileDetails.fileName;
        }
      } else {
        return "";
      }
    } catch (e) {
      console.log("exception", e);
    }

  }
  showIconlist = () => {
    this.setState({ showIconlist: !this.state.showIconlist });
  }

  modalContainer() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', margin: 20, marginBottom: 0 }}>

        {/* <Text style={styles.commentSection}>{'Comments'}</Text> */}
        <View style={{ position: 'relative', height: 50, width: 100, left: 10, marginTop: 28 }}>

          <TouchableOpacity onPress={() => this.showIconlist()} style={{ padding: 5, position: 'absolute', width: 40, zIndex: 99999, top: 6, bottom: 0, left: 180 }} >
            <Icon name='md-link' size={20} />
          </TouchableOpacity>
          <TextInput
            maxLength={27}
            autoCapitalize="none"
            style={styles.textInputStyle}
            placeholder={"Add your comment"}
            value={this.state.comment}
            onChangeText={(text) => this.setState({ comment: text })}
            underlineColorAndroid="transparent"
          />
          {this.state.showIconlist ?

            <View style={{
              flex: 1,
              flexDirection: 'row',
              position: 'absolute',
              backgroundColor: '#808080',
              left: 88,
              borderRadius: 5,
              bottom: 55
            }}>
              <View style={{ width: 43, height: 30, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
                <TouchableOpacity onPress={() => this.onBrowsePress('image')}>
                  <Icon style={{ padding: 5, left: 6, marginBottom: 1 }} name='md-image' size={29} />
                </TouchableOpacity>
              </View>
              <View style={{ width: 43, height: 30, borderRight: 1, borderRightColor: '#212121', borderStyle: 'solid' }}>
                <TouchableOpacity onPress={this.pickImageHandler} >
                  <Icon style={{ padding: 5, left: 6, marginBottom: 1 }} name='md-camera' size={30} />
                </TouchableOpacity>
              </View>
              <View style={{ width: 43, height: 38 }}>
                <TouchableOpacity onPress={() => this.onBrowsePress('document')} >
                  <Icon style={{ padding: 5, left: 8, marginBottom: 14 }} name='md-document' size={29} />
                </TouchableOpacity>
              </View>
            </View>
            : null}
        </View>

        {/* <View>
        <Button
          buttonTextStyle={{color: '#000'}}
          text={'Browse..'}
          style={styles.browserStyle}
          onPress={() => this.onBrowsePress()}
        />
        </View> */}

        <View>
          {this.applyButton()}
        </View>
        {(this.state.taskDetails.TrackDoc !== "" && this.state.uploadFileDetails === '') ?
          null
          : this.userUploadDoc()}
      </View>
    )
  }

  uploadedDocView() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', padding: 5 }}>{this.showDataText()}</Text>
        {!this.state.downloadFileStart ?
          <Icon name="md-download" size={20} onPress={() => this.onDownloadingLink(this.state.taskDetails.TrackDoc, this.state.taskDetails.Task_ID)} />
          : <ActivityIndicator color="#ccc" size={20} />}
      </View>
    )
  }

  userUploadDoc() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', left: 10, bottom: 8, alignItems: 'center' }}>
        {this.state.showIconlist == false ? <Text style={{ textAlign: 'center', padding: 5 }}>{Helper.truncateWords(this.uploadedFileText() , 30)}</Text> : null}

      </View>
    )
  }

  showDataText() {
    console.log("this.state.taskDetails.TrackDoc", this.state.taskDetails.TrackDoc);
    try {
      return Helper.truncateWords(this.state.taskDetails.TrackDoc, 20)
    } catch (e) {
      console.log("exception", e)
    }
  }

  // onDownloadingLink(link) {
  //   RNFetchBlob.fetch('POST', link, {
  //     //... some headers,
  //     'Content-Type' : 'octet-stream'
  //   }, base64DataString)
  //   // listen to upload progress event, emit every 250ms
  //   .uploadProgress({ interval : 250 },(written, total) => {
  //       console.log('uploaded', written / total)
  //   })
  //   // listen to download progress event, every 10%
  //   .progress({ count : 10 }, (received, total) => {
  //       console.log('progress', received / total)
  //   })
  //   .then((resp) => {
  //     console.log("RESp", resp);
  //     // ...
  //   })
  //   .catch((err) => {
  //     // ...
  //   })
  // }
  onDownloadingLink(url, fileNameId) {
    this.requestFileWritePermission(url, fileNameId);
  }


  async requestFileWritePermission(url, fileNameId) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'File Write Permission',
          'message': 'File write permission ' +
            'so you can upload data.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the storage")
        this.setState({ downloadFileStart: true })
        const { config, fs } = RNFetchBlob;
        const downloads = fs.dirs.DownloadDir;
        return config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: downloads + '/' + 'CardealerTask_' + fileNameId + "." + url.split('.')[url.split('.').length - 1],
          }
        })
          .fetch('GET', url).then((res) => {
            ToastAndroid.show('File Downloaded', ToastAndroid.SHORT);
            this.setState({ modalVisible: false, downloadFileStart: false })
          });
      } else {
        console.log("storage permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }


  docModalContainer() {
    return (
      <View style={{ flex: 1, margin: 20, marginBottom: 0 }}>
        <Text style={styles.commentSection}>{'File Upload'}</Text>
        <Button
          buttonTextStyle={{ color: '#000' }}
          text={'Browse..'}
          style={styles.browserStyle}
          onPress={() => this.onBrowsePress('image')}
        />
        {this.applyButton()}
      </View>
    )
  }

  footer() {
    return (
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <Text style={{ textAlign: 'center', color: '#dc3545' }}>{'Showing All'}</Text>
          <PaginationBox
            textItem={paginationValue}
          />
        </View>
        <View style={styles.footerButton}>
        </View>
      </View>
    )
  }

  onPressHeader = (title) => {
    if (title !== 'comments' && title !== 'doc') {
      let { taskList } = this.state.listItem;
      if (title !== 'Task_ID' && title !== 'Task_Name') {
        this.setState({ [title]: !this.state[title] });
        if (this.state[title]) {
          taskList.Data.Tasklist.sort(function compare(a, b) {
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
          this.setState({ taskList: this.state.listItem.taskList })
        } else {
          taskList.Data.Tasklist.sort(function compare(a, b) {
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
          this.setState({ taskList: this.state.listItem.taskList })
        }
      } else if (title === 'Task_Name') {
        this.setState({ [title]: !this.state[title] });
        if (!this.state[title]) {
          taskList.Data.Tasklist.sort(function compare(a, b) {
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
          this.setState({ taskList: this.state.listItem.taskList })
        } else {
          taskList.Data.Tasklist.sort(function compare(a, b) {
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
          this.setState({ taskList: this.state.listItem.taskList })
        }
      } else {
        this.setState({ [title]: !this.state[title] });
        taskList.Data.Tasklist.reverse();
        this.setState({ taskList: this.state.listItem.taskList })
      }
    }

  }

  myJobHeader() {
    return jobDetailsTitle.map((data, i) => {
      return (
        
        <TouchableOpacity style={styles.myJobId} key={i} >
          <Text style={{ color: '#fff', paddingRight: data.title == 'Status' ? 24 : 15 }}>{data.title}</Text>
          {/*<Icon name="ios-arrow-round-up" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'black' : 'grey') : 'grey'} />
          <Icon name="ios-arrow-round-down" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'grey' : 'black') : 'grey'} />*/}
        </TouchableOpacity>
      )
    })
  }

  dataTable() {
    let { taskList } = this.state.listItem;
    if (taskList !== undefined) {
      if (taskList.Data !== undefined) {
        if (taskList.Data.Tasklist !== undefined) {
          return (
            <View style={{ flex: 8, backgroundColor: "#fff" }}>
              <ScrollView>
                {this.showTables(taskList.Data.Tasklist)}
              </ScrollView>
            </View>
          )
        } else {
          return (
            <View style={{ flex: 8, alignItems: 'center', padding: 20 }}>
              <Text style={{ color: '#d3d3d3' }}>No Job List</Text>
            </View>
          )
        }
      }
    } else {
      return <View style={{ flex: 8, backgroundColor: "#fff" }} />
    }
  }

  showModal(data) {
    console.log("data###343", data)
    if (data.traking_status === 'Stopped') {
      this.setState({ modalVisible: true, taskDetails: data, comment: data.Comments !== null ? data.Comments : '', docUpload: false })
    }
    else {
      ToastAndroid.show('You can not add notes as task has not been stopped', ToastAndroid.SHORT);
    }
  }

  showFileModal(data) {
    console.log("data###343", data)
    this.setState({ modalVisible: true, taskDetails: data, uploadDocName: '', docUpload: true })
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



  sendEmployeeAttendance(dataReceived, flag) {

    console.log("dataReceived", dataReceived.Value);
    // let { data } = this.props.userCredential;
    const dataValue = { "Id": "0", "UserId": this.props.userCredential.data.ID.toString(), "Lat": this.state.latitude, "Long": this.state.longitude, "LatLongAddress": this.state.Address, "Flag": flag, "StatusDate": moment().format('MM/DD/YY HH:mm'), "StatusType": dataReceived.Value, "AttendanceId": "0", "Comments": "check", "Created_By": "0", "Created_Date": "null", "Is_Active": "false" }
    // const dataValue = {"Id":"0","UserId":"50","StatusDate":"09/18/2018 16:29","StatusType":"1","AttendanceId":"0","Comments":"check","Created_By":"0","Created_Date":"null","Is_Active":"false"}
    console.log("dataValue", dataValue);


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

  showTables(dataValue) {
    return dataValue.map((data, i) => {
      // let statusId = null;
      // if(data.traking_status === 'Started' || data.traking_status === 'Resumed' || data.traking_status === 'Paused') {
      //   statusId = false
      // }
      paginationValue = i + 1;
      const { jobId, assignToId, jobDescription } = this.props.navigation.state.params;
      const dataPass = { jobName: data.Job_Name, taskId: data.Task_ID, jobId: jobId, assignToId: assignToId, taskName: data.Task_Name, totaltime_sec: data.totaltime_sec !== null ? data.totaltime_sec : '0', taskStatus: data.traking_status, checkInTime: data.Check_in }
      return (
        <Row key={i} style={[styles.myJobDataStyle, { backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff' }]}>
          <Col style={styles.textContainerStyle} size={25}><Text style={styles.tableContent}>{data.Task_Name}</Text></Col>
          <Col style={styles.textContainerStyle} size={20}><Text style={[styles.tableContent]}>{data.Time}</Text></Col>
          <Col style={styles.textContainerStyle} size={18}>
            <TouchableOpacity onPress={() => Helper.navigateToPage(this, 'StartTimer', dataPass)} disabled={(data.traking_status === 'Stopped') ? true : false}>
              <Text style={[styles.tableContent, { color: Helper.getTextColor(data.traking_status.toUpperCase()) }]}>{data.traking_status}</Text>
            </TouchableOpacity>
          </Col>
          <Col style={[styles.textContainerStyle, { alignSelf: 'center' }]} size={20}>
            <TouchableOpacity onPress={() => this.showModal(data)}>
              {data.Comments !== null ? <Text style={{ textAlign: 'center' }}>{data.Comments !== null ? Helper.truncateWords(data.Comments) : ''}</Text> : null}
              <FontAwesome5 size={20} name="edit" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </Col>
        </Row>
      )
    })
  }

  render() {
    var showBottomBar = false;
    let { employeeAttendance } = this.state.listAttendanceItem;
    if (employeeAttendance == [] || employeeAttendance == undefined || employeeAttendance.message == "Network request failed" || employeeAttendance == null) {
      showBottomBar = false;
    }
    else {
      showBottomBar = true;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
        />
        <Header
          headerContainer={styles.headerContainerStyle}
          headerTextStyle={styles.headerTextStyle}
          headerText={'My Tasks'}
          headerLeft={{ padding: 10 }}
          notificationCount={this.props.notificationCount.notification}
          onLeftIconClick={() => this.openControlPanel()}
          onRightIconClick={() => this.setState({ search: !this.state.search })}
          onRightIconFirstClick={() => Helper.navigateToPage(this, 'Notifications', { counterNo: this.props.notificationCount.notification })}
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
        {this.state.loaderVisible && <View style={styles.activityIndicator}>
          <ActivityIndicator
            color="#ccc"
            size={30}
          />
        </View>}
        {showBottomBar ? <BottomTabBar onPressTab={this.onPressTab} punchInList={employeeAttendance} /> : null}

      </View>
    )
  }
}


const mapStateToProps = state => ({
  jobList: state.jobList,
  taskList: state.taskList,
  ssidList: state.allSsidData,
  attendance: state.employeeAttendance,
  userCredential: state.userCredential,
  notificationCount: state.notificationCount,
  updateTask: state.updateTask,
  sendTaskDoc: state.sendTaskDoc
});

export default connect(mapStateToProps)(TaskList);
