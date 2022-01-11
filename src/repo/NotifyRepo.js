import * as Notify from '../api/NotifyApi';
export const getNotificationData = async (values = {REQ_TOKEN, REQ_NAME}) => {
  const Data = await Notify.getNotifications(values);
  console.log('TCL: getNotificationData -> Data', Data);
  return Data;
};

export const editNotificationRepo = async (
  values = {REQ_TOKEN, REQ_NAME, REQ_PARAMS: {SHIFT_KY}},
) => {
  const Data = await Notify.editNotification(values);
  console.log('TCL: editNotificationRepo -> Dataaaaaaaaaaaaaaaa', Data);
  return Data;
};
const cancelNotifications = async () => {
  // firebase.notifications().cancelAllNotifications();
  // // This does in fact NOT cancel all notifications since repeating ones that have already been displayed will continue forever
  // firebase.notifications().removeAllDeliveredNotifications();
};
