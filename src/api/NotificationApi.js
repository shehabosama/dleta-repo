/* eslint-disable no-undef */
import axios from 'axios';
import {API_ENDPOINT_DLETA} from '../utils/Config';

export const subscribeApi = async (TOKEN, FCM_TOKEN) => {
  try {
    await axios.put(`${API_ENDPOINT_DLETA}`, {
      REQ_NAME,
      TOKEN,
      REQ_PARAMS: {
        FCM_TOKEN,
      },
    });
  } catch (error) {
    console.log('ERrorrrrrrrr', error);
  }
};

export const unSubscribeApi = async (TOKEN, FCM_TOKEN) => {
  try {
    await axios.put(`${API_ENDPOINT_DLETA}`, {
      TOKEN,
      USER_ID,
      REQ_PARAMS: {
        FCM_TOKEN,
      },
    });
  } catch (error) {
    console.log('ERrorrrrrrrr', error);
  }
};

export const updateFcmToken = async (TOKEN, oldToken, newToken) => {
  try {
    await axios.put(`${API_ENDPOINT_DLETA}`, {
      TOKEN,
      userId,
      oldToken,
      newToken,
    });
  } catch (error) {
    console.log('ERRRRRR', error);
  }
};
