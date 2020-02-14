export const logoTitle = 'FAMS';
export const login = 'LOGIN';
export const wiredssid = 'FCS';
export const defaultGatewayId = '10.10.99.1';
export const forgot = 'Forgot Password?';
export const resend = 'Resend';
export const otpScreenTitle = 'Enter One Time Password';
export const sentOtpMessage = 'One Time Password(OTP) has been sent to your registered mobile number, please enter the same here to login.';
export const welcomeMsg = 'WELCOME TO FAMS';
export const searchHolder = 'Search Task/Leaves';
export const apiUrl = 'http://cardealer.demoappstore.com/';


// Images
export const logoImage = require('../images/rounded_logo.png')
export const bgImage = require('../images/bg_theme.jpg')
export const logo = require('../images/logo.png')
export const firstImage = require('../images/firstIcon.png')
export const secondImage = require('../images/secondIcon.png')
export const thirdImage = require('../images/thirdIcon.png')
export const fourthImage = require('../images/fourthIcon.png')
export const fifthImage = require('../images/fifthIcon.png')
export const logoutImage = require('../images/logout.png')
export const leaveApplyIcon = require('../images/Leave-icon.png')
export const userLogo = require('../images/user.png')
export const darkLogo = require('../images/logo_dark.jpg')
export const greyLogo = require('../images/logo_grey.jpg')
export const famLogo = require('../images/famsLogo.jpg')
export const dashboardIcon = require('../images/dashboardIcon.png')
export const logoutIcon = require('../images/logoutIcon.png')


export const loginFeature = 'Log in more features';
export const crowdLogo = 'CrowdCompass';
export const crowdMoto = 'by Cvent';
export const aboutUsHeaderTitle = 'AboutUs';

//LogIN Page
export const logIn = 'Log In';
export const logInTitle = 'Let\'s get started.';
export const logInCaption = 'Enter your name.';
export const terms = 'By logging in, you agree to Cvent\'s';
export const privacyPolicy = 'Privacy Policy';
export const and = 'and';
export const termsUse = 'Terms of Use';

export const logInEntry = [
  { text: 'User ID', icon: 'md-person', value: 'email'},
  { text: 'Password', icon: 'ios-unlock', value: 'password' },
];

export const aboutUsFirst = 'EventApp is the definitive voice for technology and digital innovation across the financial and government services sectors, spanning Australia, New Zealand and South East Asia.';
export const drawerMain = [
  { text: 'Switch Event', icon: 'ios-swap' },
  { text: 'FST Banking Summit', icon: 'ios-home-outline' },
];

export const myItems = [
  { icon: 'ios-stopwatch-outline', menuOption: 'My Schedule', screen: 'Agenda' },
  { icon: 'md-text', menuOption: 'My Messages', screen: 'Agenda'},
  { icon: 'md-contact', menuOption: 'My Contacts', screen: 'Agenda' },
  { icon: 'ios-paper-outline', menuOption: 'My Notes', screen: 'Agenda' },
];

export const eventGuide = [
	{ icon: dashboardIcon, menuOption: 'My Dashboard', screen: 'Dashboard' },
	{ icon: secondImage, menuOption: 'My Jobs', screen: 'MyJob' },
	{ icon: secondImage, menuOption: 'All Task', screen: 'AllTask' },
  { icon: thirdImage, menuOption: 'My Attendance', screen: 'Attendance' },
  // { icon: 'long-arrow-right', menuOption: 'Daily Rental Log', screen: 'null' },
  { icon: fifthImage, menuOption: 'My Break', screen: 'MyBreak'},
	{ icon: fourthImage, menuOption: 'My Leave', screen: 'LeaveList' },
	{ icon: leaveApplyIcon, menuOption: 'Apply Leave', screen: 'LeaveApply' },
  { icon: fifthImage, menuOption: 'My Over Time', screen: 'OverTimeList' },
  { icon: logoutIcon, menuOption: 'Logout', screen: 'logout' },
];

export const dashboardCardItem = [
  { icon: 'ios-basket', title: 'Tasks', count: '10',color: '#cc0000', secondaryColor: '#ff0000', screen: 'null'  },
  { icon: 'ios-basket', title: 'Jobs', count: '10', color: '#005900', secondaryColor: '#008000', screen: 'MyJob' },
  { icon: 'ios-basket', title: 'Leaves', count: '0', color: '#4c4cff', secondaryColor: '#7373AE', screen: 'LeaveList' },
];



export const myJobTitle = [
	{ title: 'Job Name', id: 'Job_Name' },
	{ title: 'Total Task', id: 'Task' },
	{ title: 'Total Time', id: 'Time' },
  { title: 'Status', id: 'traking_status' },


];
export const allTaskTitle = [
	{ title: 'Job Name', id: 'Job_Name' },
	{ title: 'Task Name', id: 'Task' },
	{ title: 'Total Time', id: 'Time' },
  { title: 'Status', id: 'traking_status' },


];
export const myBreakTitle = [
	{ title: 'Break Name', id: 'Break_Name' },
	{ title: 'Break Time', id: 'Time' },
  { title: 'Assign By', id: 'Assign_By' },


];
export const managementTitle = [
  { title: 'Full Name', id: 'full_name' },
  { title: 'Email', id: 'email' },
  { title: 'Roll Name', id: 'roll_name' },
  { title: 'Action', id: 'action' },
];

export const myLeaveTitle = [
  { title: 'Type', id: 'leaveType' },
  { title: 'From Date', id: 'fromDate' },
  { title: 'To Date', id: 'toDate' },
  { title: 'Status', id: 'status' },
  { title: 'Action', id: 'action' },
];

export const myNotificationTitle = [
  { title: 'S.no', id: 'serial' },
  { title: 'Title', id: 'title' },
  { title: 'Notification', id: 'notification' },
  { title: 'Date', id: 'date' },
];

export const overTimeTitle = [
  { title: 'OT hours', id: 'otHours' },
  { title: 'From Date', id: 'fromDate' },
  { title: 'To Date', id: 'toDate' },
	{ title: 'Status', id: 'status' },
	{ title: 'Action', id: 'action' },
];

export const myAttendanceTitle = [
  { title: 'Date', id: 'Job_ID' },
  { title: 'Punch In', id: 'Job_Name' },
  { title: 'Meal In', id: 'traking_status' },
  { title: 'Meal Out', id: 'Time' },
  { title: 'Punch Out', id: 'Time' },
];

export const jobDetailsTitle = [
	{ title: 'Task Name', id: 'Task_Name' },
	{ title: 'Total Time', id: 'time' },
  { title: 'Status', id: 'traking_status' },
  { title: 'Notes', id: 'notes' },
];

export const leaveTypeField = { title: 'Leave Type', type: 'leaveTypeData', field: [{option: 'Select Leave'},{ option: 'sick'}, {option: 'Vacation'}, {option: 'Bereavement'},{option: 'training'}, {option: 'personal'}, {option: 'other'}]}
export const reportedToField = { title: 'Reported To', type: 'reportedToData', field: [{option: 'Select Manager'},{ option: 'Manager1'}, {option: 'Manager2'}, {option: 'Manager3'}]}
export const dateField = [
  { title: 'From Date', value: 'fromDate',isStartDate:true},
  { title: 'To Date', value: 'toDate',isStartDate:false}
];

export const leaveApplyButton = [
  { button: 'SUBMIT', id: 1},
  { button: 'CANCEL', id: 2}
];
export const commentButton = [
  { button: 'Update', id: 1}
  // { button: 'Cancel', id: 2}
];
export const uploadButton = [
  { button: 'Update', id: 1},
  { button: 'Cancel', id: 2}
];
export const attendanceListResponse = {
	"Message": null,
	"StatusCode": "200",
	"Data": {
		"attendenclist": [{
			"Id": 9,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/11/2018 12:42",
			"Meal_In": "",
			"Meal_out": "",
			"Check_Out": "09/11/2018 03:11",
			"Created_Date": "09/11/2018",
			"Status": ""
		}, {
			"Id": 8,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/11/2018 12:41",
			"Meal_In": "09/11/2018 12:42",
			"Meal_out": "09/11/2018 12:42",
			"Check_Out": "09/11/2018 12:42",
			"Created_Date": "09/11/2018",
			"Status": ""
		}, {
			"Id": 7,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 09:12",
			"Meal_In": "09/10/2018 09:13",
			"Meal_out": "09/10/2018 09:13",
			"Check_Out": "09/10/2018 09:13",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 6,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 09:12",
			"Meal_In": "",
			"Meal_out": "",
			"Check_Out": "09/10/2018 09:12",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 5,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 09:11",
			"Meal_In": "09/10/2018 09:12",
			"Meal_out": "09/10/2018 09:12",
			"Check_Out": "09/10/2018 09:12",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 4,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 09:09",
			"Meal_In": "",
			"Meal_out": "",
			"Check_Out": "09/10/2018 09:11",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 3,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 09:06",
			"Meal_In": "",
			"Meal_out": "",
			"Check_Out": "09/10/2018 09:06",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 2,
			"StatusType": 4,
			"Comments": null,
			"Check_In": "09/10/2018 08:27",
			"Meal_In": "09/10/2018 09:01",
			"Meal_out": "09/10/2018 09:03",
			"Check_Out": "09/10/2018 09:03",
			"Created_Date": "09/10/2018",
			"Status": ""
		}, {
			"Id": 1,
			"StatusType": 1,
			"Comments": null,
			"Check_In": "09/10/2018 08:26",
			"Meal_In": "",
			"Meal_out": "",
			"Check_Out": "",
			"Created_Date": "09/10/2018",
			"Status": "PunchIn"
		}],
		"CanApply": [{
			"Disabled": false,
			"Group": null,
			"Selected": false,
			"Text": "PunchIn",
			"Value": "1"
		}]
	}
};
export const managementScreenBody = {
	"Message": null,
	"StatusCode": "200",
	"Data": {
		"manageList": [
      {
			"Id": 1,
			"StatusType": 4,
			"FullName": "Mark John 1",
			"Email": "markj@cardealer.us",
			"Roll": "Employee",
		  },
      {
			"Id": 2,
			"StatusType": 4,
			"FullName": "Mark John 1",
			"Email": "markj@cardealer.us",
			"Roll": "Employee",
		  },
      {
			"Id": 3,
			"StatusType": 4,
			"FullName": "Mark John 1",
			"Email": "markj@cardealer.us",
			"Roll": "Employee",
		  },
      {
			"Id": 4,
			"StatusType": 4,
			"FullName": "Mark John 1",
			"Email": "markj@cardealer.us",
			"Roll": "Employee",
		  }
    ],
		"CanApply": [{
			"Disabled": false,
			"Group": null,
			"Selected": false,
			"Text": "PunchIn",
			"Value": "1"
		}]
	}
};

export const notificationData = {
	"Message": null,
	"StatusCode": "200",
	"Data": {
		"notificationList": [
      {
			"Id": 9,
			"StatusType": 4,
      "title": "Car Dealer Job",
      "description": "Job Assign",
      "time": "24/09/18"
		}, {
			"Id": 8,
			"StatusType": 4,
      "title": "Car Dealer Job",
      "description": "Job Assign",
      "time": "24/09/18"
		}, {
			"Id": 7,
			"StatusType": 4,
      "title": "Car Dealer Job",
      "description": "Job Assign",
      "time": "24/09/18"
		}, {
			"Id": 6,
			"StatusType": 4,
			"Status": "",
      "title": "Car Dealer Job",
      "description": "Job Assign",
      "time": "24/09/18"
		}, {
			"Id": 5,
			"StatusType": 4,
			"Status": "",
      "title": "Car Dealer Job",
      "description": "Job Assign",
      "time": "24/09/18"
		}],
	}
}
