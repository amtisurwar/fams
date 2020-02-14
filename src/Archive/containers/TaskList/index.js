import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Text,
  Modal,
  TextInput,
  NetInfo,
  ScrollView,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native'
import { Row, Col } from 'native-base'
import Drawer from 'react-native-drawer'
import { NetworkInfo } from 'react-native-network-info';

import RNFetchBlob, { base64DataString } from 'react-native-fetch-blob'
import WifiManager from 'react-native-wifi';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PaginationBox from '../../component/PaginationBox';
import styles from './styles';
import Button from '../../component/Button';
import DrawerView from '../../component/DrawerView';
import EventList from '../../component/EventList';
import InputField from '../../component/InputField';
import DashboardTitle from '../../component/DashboardTitle';
import { eventList, eventListJune , mainText, logo, myJobTitle, jobDetailsTitle, commentButton, wiredssid, defaultGatewayId } from '../../common/constant';
import * as Helper from '../../common/helper';
import Header from '../../component/Header';
import SideMenu from '../SideMenu'

let paginationValue = 0;

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      drawerOpen: false,
      listItem: [],
      modalVisible: false,
      comment: '',
      uploadFileDetails: '',
      taskDetails: {},
      loaderVisible: false,
      downloadFileStart: false,
      docUpload: false,
      Id: 0
    }
  }

  setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }

  componentWillMount() {
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
    const value = {"Task_ID":"0","Job_ID":jobId,AssignTo: assignToId,AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
    this.props.dispatch({
      type: 'TASK_LIST',
      payload: value,
      id: authentication
    });
    this.setState({ loaderVisible: true })
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
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
    if(nextProps.taskList !== this.props.taskList) {
      this.setState({ listItem: nextProps.taskList, loaderVisible: false })
    }

    if(nextProps.sendTaskDoc !== this.props.sendTaskDoc) {
      console.log("next==============", nextProps.sendTaskDoc);
      if(nextProps.sendTaskDoc.sendTaskDoc !== undefined) {
        if(nextProps.sendTaskDoc.sendTaskDoc.Data === null) {
          ToastAndroid.show('Upload file less than 3 mb', ToastAndroid.SHORT);
        }
      }
    }
    if(nextProps.updateTask !== this.props.updateTask) {
      if(nextProps.updateTask.updateComment !== undefined) {
        if(nextProps.updateTask.updateComment.StatusCode !== undefined) {
          if(nextProps.updateTask.updateComment.StatusCode === '200') {
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
    this.setState({ drawerOpen: false})
  }

  openControlPanel = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen})
  }

  onNextPress() {}

  onPreviousPress() {}

  sendFileUrl() {
    try {
      if(this.uploadedFileText() !== '' && this.uploadedFileText() !== null) {
        if(this.props.sendTaskDoc.sendTaskDoc.Data !== null) {
          return this.props.sendTaskDoc.sendTaskDoc.Data.filename;
        } else {
          return "";
        }
      } else {
        return "";
      }
    } catch(e) {
      console.log(e);
    }
  }

  onSubmitPress = () => {
    const { jobId, assignToId } = this.props.navigation.state.params;
    const authentication = this.props.userCredential.data.UserID;
    const value = {"Task_ID":"0","Job_ID":jobId,AssignTo: assignToId,AssignBy:"0","CreatedBy":"0","Task_Status":"0"};
    const dataValue = {"Task_ID": this.state.taskDetails.Task_ID,"Comments": this.state.comment, "File": this.sendFileUrl() }
    if(this.state.comment !== '') {
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
      <Row style={{padding: 20, justifyContent: 'space-around', alignItems: 'center'}}>
        {commentButton.map((data, i) => {
          return (
            <Button
            key={i}
            buttonTextStyle={styles.buttonTextStyle}
            text={data.button}
            style={data.id === 1 ? styles.buttonSubmitStyle: styles.buttonCancelStyle}
            onPress={data.id === 1 ? this.onSubmitPress : this.onCancelPress}
            />
          )
        })}
      </Row>
    )
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.comment !== this.state.comment) {
      if(nextState.comment !== null || nextState.comment !== undefined || nextState.comment !== '') {
        if(nextState.comment.length !== undefined) {
          if(nextState.comment.length && nextState.comment.length === 200) {
            ToastAndroid.show('Comment should not more than 200 characters', ToastAndroid.SHORT);
          }
        }
      }
    }
  }

  body() {
    let comments = this.state.taskDetails.Comments !== undefined ? this.state.taskDetails.Comments : '';
    return(
      <View style={{flex: 1}}>
        <DashboardTitle
          title="Task List"
          name="tasks"
          fontAwesome={true}
          titleStyle={styles.titleStyle}
        />
        <View style={{flex: 9}}>
          <View style={styles.myJobTitle}>
            {this.myJobHeader()}
          </View>
          <View style={{flex: 8}}>
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

  onBrowsePress() {
    let id = this.state.Id;
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      console.log("res", res);
      try {
        if(res !== undefined) {
          console.log("res", res);
          if(res.fileName !== undefined && res.fileName !== null) {
            console.log("fileName", res.fileName);
            this.setState({ uploadFileDetails: res})
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
      } catch(e) {
        console.log("exception", e);
      }
    });
  }

  uploadedFileText() {
    try {
      if(this.state.uploadFileDetails !== '' && this.state.uploadFileDetails !== null) {
        if(this.state.uploadFileDetails.fileName !== undefined && this.state.uploadFileDetails.fileName !== null) {
          return this.state.uploadFileDetails.fileName;
        }
      } else {
        return "";
      }
    } catch(e) {
      console.log("exception", e);
    }

  }


  modalContainer() {
    return (
      <View style={{flex: 1, margin: 20, marginBottom: 0}}>
        <Text style={styles.commentSection}>{'Comments'}</Text>
        <TextInput
          maxLength={200}
          autoCapitalize="none"
          style={styles.textInputStyle}
          placeholder={"Enter your comment"}
          value={this.state.comment}
          onChangeText={(text) => this.setState({ comment: text })}
          underlineColorAndroid="transparent"
        />
        <Button
          buttonTextStyle={{color: '#000'}}
          text={'Browse..'}
          style={styles.browserStyle}
          onPress={() => this.onBrowsePress()}
        />
        {(this.state.taskDetails.TrackDoc !== "" && this.state.uploadFileDetails === '') ?
        this.uploadedDocView()
        : this.userUploadDoc()}
        {this.applyButton()}
      </View>
    )
}

  uploadedDocView() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', padding: 5}}>{this.showDataText()}</Text>
        {!this.state.downloadFileStart ?
        <Icon name="md-download" size={20} onPress={() => this.onDownloadingLink(this.state.taskDetails.TrackDoc, this.state.taskDetails.Task_ID)} />
        : <ActivityIndicator color="#ccc" size={20} />}
      </View>
    )
  }

  userUploadDoc() {
    return (
      <Text style={{textAlign: 'center', padding: 5}}>{this.uploadedFileText()}</Text>
    )
  }

  showDataText() {
    console.log("this.state.taskDetails.TrackDoc",this.state.taskDetails.TrackDoc);
    try {
      return Helper.truncateWords(this.state.taskDetails.TrackDoc, 20)
    }  catch(e) {
        console.log("exception",e)
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
  onDownloadingLink(url,fileNameId) {
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
      fileCache : true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  downloads + '/' + 'CardealerTask_'+fileNameId + "."+url.split('.')[url.split('.').length - 1],
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
      <View style={{flex: 1, margin: 20, marginBottom: 0}}>
        <Text style={styles.commentSection}>{'File Upload'}</Text>
        <Button
          buttonTextStyle={{color: '#000'}}
          text={'Browse..'}
          style={styles.browserStyle}
          onPress={() => this.onBrowsePress()}
        />
        {this.applyButton()}
      </View>
    )
  }

  footer() {
    return (
      <View style={styles.footer}>
        <View style={styles.pagination}>
          <Text style={{textAlign: 'center', color: '#dc3545'}}>{'Showing All'}</Text>
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
    if(title !== 'comments' && title !== 'doc') {
      let { taskList } = this.state.listItem;
      if(title !== 'Task_ID' && title !== 'Task_Name') {
        this.setState({ [title]: !this.state[title] });
          if(this.state[title]) {
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
      } else if(title === 'Task_Name') {
        this.setState({ [title]: !this.state[title] });
          if(!this.state[title]) {
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
        <TouchableOpacity style={styles.myJobId} key={i} onPress={() => this.onPressHeader(data.id)}>
          <Text>{data.title}</Text>
          {/*<Icon name="ios-arrow-round-up" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'black' : 'grey') : 'grey'} />
          <Icon name="ios-arrow-round-down" size={20} color={this.state[data.id] !== undefined ? (this.state[data.id] ? 'grey' : 'black') : 'grey'} />*/}
        </TouchableOpacity>
      )
    })
  }

  dataTable() {
    let { taskList } = this.state.listItem;
    if(taskList !== undefined) {
      if(taskList.Data !== undefined) {
        if(taskList.Data.Tasklist !== undefined) {
            return (
              <View style={{flex: 8, backgroundColor: "#fff"}}>
                <ScrollView>
                  {this.showTables(taskList.Data.Tasklist)}
                </ScrollView>
              </View>
            )
        } else {
          return (
            <View style={{flex: 8, alignItems: 'center', padding: 20}}>
              <Text style={{color: '#d3d3d3'}}>No Job List</Text>
            </View>
          )
        }
      }
    } else {
      return <View style={{flex: 8, backgroundColor: "#fff"}} />
    }
  }

  showModal(data) {
    console.log("data###343", data)
    this.setState({ modalVisible: true, taskDetails: data, comment: data.Comments !== null ? data.Comments : '', docUpload: false })
  }

  showFileModal(data) {
    console.log("data###343", data)
    this.setState({ modalVisible: true, taskDetails: data, uploadDocName: '', docUpload: true })
  }

  showTables(dataValue) {
    return dataValue.map((data, i) => {
      // let statusId = null;
      // if(data.traking_status === 'Started' || data.traking_status === 'Resumed' || data.traking_status === 'Paused') {
      //   statusId = false
      // }
      paginationValue = i+1;
      const { jobId, assignToId, jobDescription } = this.props.navigation.state.params;
      const dataPass = { jobName: data.Job_Name, taskId: data.Task_ID, jobId: jobId, assignToId: assignToId, taskName: data.Task_Name, totaltime_sec: data.totaltime_sec !== null ? data.totaltime_sec: '0', taskStatus:data.traking_status, checkInTime: data.Check_in }
      return (
        <Row key={i} style={[styles.myJobDataStyle, {backgroundColor: i % 2 !== 0 ? '#F5F5F5' : '#fff'}]}>
          <Col style={styles.textContainerStyle} size={10}>
            <Text style={[styles.tableContent,{color: '#0062cc'}]}>{!this.state.Task_ID ? i+1 : (dataValue.length)-i}</Text>
          </Col>
          <Col style={styles.textContainerStyle} size={20}><Text style={[styles.tableContent,{color: '#0062cc'}]}>{data.Job_Name}</Text></Col>
          <Col style={styles.textContainerStyle} size={15}><Text style={styles.tableContent}>{data.Task_Name}</Text></Col>
          <Col style={styles.textContainerStyle} size={18}>
            <TouchableOpacity onPress={() => Helper.navigateToPage(this, 'StartTimer', dataPass )} disabled={(data.traking_status === 'Stopped') ? true : false}>
              <Text style={[styles.tableContent,{ color: Helper.getTextColor(data.traking_status.toUpperCase())}]}>{data.traking_status}</Text>
            </TouchableOpacity>
          </Col>
          <Col style={[styles.textContainerStyle,{alignSelf: 'center'}]} size={15}>
            <TouchableOpacity onPress={() => this.showModal(data)}>
              {data.Comments !== null ? <Text style={{textAlign: 'center'}}>{data.Comments !== null ? Helper.truncateWords(data.Comments) : ''}</Text> : null }
              <FontAwesome5 size={20} name="edit" style={{alignSelf: 'center'}}/>
            </TouchableOpacity>
          </Col>
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
          {this.state.loaderVisible && <View style={styles.activityIndicator}>
            <ActivityIndicator
            color="#ccc"
            size={30}
            />
          </View>}
        </View>
    )
  }
}


  const mapStateToProps = state => ({
    jobList: state.jobList,
    taskList: state.taskList,
    userCredential: state.userCredential,
    notificationCount: state.notificationCount,
    updateTask: state.updateTask,
    sendTaskDoc: state.sendTaskDoc
  });

  export default connect(mapStateToProps)(TaskList);
