import { NavigationActions, StackActions } from 'react-navigation';
import * as Common from './common';
module.exports = {
  // resetNavigation to zero index
  resetNavigation(pointer, navigation, parameter = null) {
    const _this = pointer;
    _this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: navigation, params: parameter })],
    }));
  },

  navigateToPage(self, page, params = null) {
    if (page === 'goBack' || page === '') {
      self.props.navigation.goBack(null);
    } else {
      self.props.navigation.navigate(page, { ...params });
    }
  },

  getTimeInSec(endTime, startTime) {
    let difference = endTime - startTime;
    let seconds = Math.floor(difference / 1000);
    return seconds;
  },
  getTimeShow(totalworksec){
    let minutes = Math.floor(totalworksec / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    totalworksec %= 60;
    // if(totalworksec.toString().length < 1) { totalworksec = "0"+totalworksec}


    hours = hours.toString().length === 1 ? "0" + hours.toString() : hours;
    minutes = minutes.toString().length === 1 ? "0" + minutes.toString() : minutes;
    totalworksec = totalworksec.toString().length === 1 ? "0" + totalworksec.toString() : totalworksec;

    let ref = hours + ":" + minutes + ":" + totalworksec;
    return ref
  },
  reasonType(type) {
    switch (type) {
      case 'CL':
        return "1"
      case 'PL':
        return "2"
        break;
      default:
        return "0"
    }
  },

  timeFormat(data){
    const timeValue = data.split(' ')
    return timeValue[1]
  },

  getTextColor(status) {
    switch(status) {
      case 'STOP':
      case 'STOPPED':
      case 'START':
      case 'STARTED':
        return '#28a745';
      case 'PAUSE':
      case 'PAUSED':
        return '#ffc107';
      case 'RESUME':
      case 'RESUMED':
        return '#ff6b07';
      case 'PENDING':
        return '#dc3545';
      default:
        return 'black'
    }
  },

  getApprovedStatusColor(status) {
    switch (status) {
      case 'APPROVED':
        return '#28a745';
      case 'PENDING':
        return '#ffc107';
      case 'REJECTED':
        return '#dc3545';
        break;
      default:
        return Common.blackColor
    }
  },

  getJobTextColor(status) {
    switch(status) {
      case 'COMPLETED':
        return '#28a745';
      case 'INPROGRESS':
      case 'IN PROGRESS':
      case 'INPROCESS':
        return '#ffc107';
      case 'PENDING':
        return '#dc3545';
      default:
        return 'black'
    }
  },

  calculateTotalSec(time) {
    if(time === null) {
      return 0;
    } else {
      let timer = time.split(":");
      let hour = timer[0];
      let min = timer[1];
      let sec = timer[2];
      let totalsec = parseInt(hour, 10) * 60 * 60 + parseInt(min, 10) * 60 + parseInt(sec, 10);
      return totalsec;
    }
  },

  checkProgressList(status) {
    if(status === null) {
      return "pending";
    } else {
      return status;
    }
  },

  truncateWords(venueString, lengthValue = 5) {
    return venueString.length < lengthValue ? venueString : venueString.substring(0,lengthValue) + "...";
  }
};
