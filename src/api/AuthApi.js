import axios from 'axios';
import {API_ENDPOINT_GATEWAY, API_ENDPOINT_DLETA} from '../utils/Config';
import * as errors from '../utils/Errors';

export const login = async ({
  REQ_NAME,
  REQ_PARAMS: {USER_ID, PASSWORD, OS, PUSH_KEY, IMEI},
}) => {
  console.log('TCL: USER_ID', USER_ID);

  try {
    const res = await axios.post(`${API_ENDPOINT_GATEWAY}`, {
      REQ_NAME,
      REQ_PARAMS: {
        USER_ID,
        PASSWORD,
        OS,
        PUSH_KEY,
        IMEI,
      },
    });
    const {USER_KY, FNAME, LNAME, TOKEN, REQ_ID} = res.data[0];
    const x = {USER_KY, FNAME, LNAME, TOKEN, REQ_ID};
    return x;
  } catch (error) {
    console.log('TCL: login -> error', error);
    console.log('TCL: login -> error.response', error.response);
    throw errors.INVALID_USER;
  }
};

const forgetPassword = async ({REQ_NAME, REQ_PARAMS: {EMAIL, PHONE}}) => {
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, {
      REQ_NAME,
      REQ_PARAMS: {EMAIL, PHONE},
    });

    return res;
  } catch (error) {
    console.log('TCL: login -> error', error);
    console.log('TCL: login -> error.response', error.response);
    throw error;
  }
};

export const getProfile = async ({REQ_NAME, REQ_TOKEN}) => {
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, {
      REQ_NAME,
      REQ_TOKEN,
    });
    return res.data;
  } catch (error) {
    console.log('TCL: getProfile -> error', error);
    console.log('TCL: getProfile -> error.response', error.response);
    throw errors.INVALID_USER;
  }
};

export const EditProfile = async ({REQ_TOKEN, REQ_NAME, REQ_PARAMS}) => {
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, {
      REQ_NAME,
      REQ_TOKEN,
      REQ_PARAMS,
    });
    return res.data;
  } catch (error) {
    console.log('TCL: getProfile -> error', error);
    console.log('TCL: getProfile -> error.response', error.response);
    throw errors.INVALID_USER;
  }
};
