import axios from 'axios';
import {API_ENDPOINT_DLETA} from '../utils/Config';
import * as errors from '../utils/Errors';

export const getNotifications = async (
  values = {REQ_TOKEN, REQ_NAME},
) => {
  console.log(
    'TCL: getNotifiactions -> {REQ_TOKEN, REQ_NAME}',
    values,
  );
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, values);

    console.log('TCL: getNotifiactions -> res', res);
    return res.data;
  } catch (error) {
    console.log('TCL: getNotifiactions -> error', error);
    console.log('TCL: getNotifiactions -> error.response', error.response);
  }
};


export const editNotification = async (
  values = {REQ_TOKEN, REQ_NAME,REQ_PARAMS:{SHIFT_KY}},
) => {
  console.log(
    'TCL: getNotifiactions -> {REQ_TOKEN, REQ_NAME}',
    values,
  );
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, values);

    console.log('TCL: acceptNotification -> res', res);
    return res.data;
  } catch (error) {
    console.log('TCL: acceptNotification -> error', error);
    console.log('TCL: acceptNotification -> error.response', error.response);
  }
};
