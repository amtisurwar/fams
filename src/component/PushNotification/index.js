import React, { Component } from "react";

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";

export default class PushNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this method generate fcm token.
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)  ", token);
    });

    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });

    // This method give received notifications to mobile to display.
    this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
      console.log("a", notif);
      if (notif && notif.local_notification) {
        return;
      }
      this.sendRemote(notif);
    });

    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
    });
  }

  // This method display the notification on mobile screen.
  sendRemote(notif) {
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true
    });
  }

  // componentWillUnmount() {
  //   this.refreshUnsubscribe();
  //   this.notificationUnsubscribe();
  // }
  render() {
    return null;
  }
}
