import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import * as notificationApi from '../api/NotificationApi';
import * as asyncStorageProvider from '../cache/AsyncStorageProvider';


export const refreshToken = async (newToken, token) => {
  try {
    const oldToken = await AsyncStorage.getItem('isSubscribed');
    // const response = await notificationApi.updateFcmToken(token,oldToken,newToken)
    console.log(response, 'SUBSCRIBE SUCCESS');
    await AsyncStorage.setItem('isSubscribed', newToken);
  } catch (error) {
    console.log(error, 'SUBSCRIBE ERROR');
    showError(error[1].message);
  }
};

const cancelNotifications = async () => {
  firebase.notifications().cancelAllNotifications();
  // This does in fact NOT cancel all notifications since repeating ones that have already been displayed will continue forever
  firebase.notifications().removeAllDeliveredNotifications();
};

export const unSubscribe = async () => {
  await cancelNotifications();
  const fcmToken = await asyncStorageProvider.getFCMToken();
  await asyncStorageProvider.deleteFCMToken();
  // await notificationApi.unSubscribeApi(fcmToken, 'CLIENT');
};

export const listenToFcmNotification = () => {
  firebase
    .notifications()
    .getInitialNotification()
    .then(newNotification => onNewNotification(newNotification));
};

export const onNewToken = async currentUser => {
  firebase.messaging().onTokenRefresh(async fcmToken => {
    if (currentUser) {
      const oldToken = await asyncStorageProvider.getFCMToken();
      // await NotificationsApi.updateFcmToken(oldToken, fcmToken, 'CLIENT');
      await asyncStorageProvider.saveFCMToken(fcmToken);
    }
  });
};

export const subscribe = async currentUser => { 
  const isSubscribed = await asyncStorageProvider.getFCMToken();
  console.log('TCL: isSubscribed', isSubscribed);
  if (isSubscribed === null) {
    if (currentUser) {
      const fcmToken = await firebase.messaging().getToken();
      console.log('TCL: Not Subscribed=============>>>>>', fcmToken);

      // const ss = await notificationApi.subscribeApi(fcmToken, 'CLIENT');
      await asyncStorageProvider.saveFCMToken(fcmToken);
    }
  }
  onNewToken(currentUser);
};

let once = false;

const onNewNotification = notificationOpen => {
  if (once && !notificationOpen) {
    return;
  }
  once = true;
  let data = null;
  if (notificationOpen) {
    data = notificationOpen.notification.data;
  }
  if (data) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  }
};
