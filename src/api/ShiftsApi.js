/* eslint-disable no-undef */
import axios from 'axios';
import {API_ENDPOINT_DLETA} from '../utils/Config';
import * as errors from '../utils/Errors';

export const getShiftsData = async (
  values = {REQ_ID, REQ_TOKEN, REQ_NAME, REQ_PARAMS: {START_DATE, END_DATE}},
) => {
  console.log(
    'TCL: getShiftsData -> {REQ_ID, REQ_TOKEN, REQ_NAME, REQ_PARAMS: {START_DATE, END_DATE}}',
    values,
  );
  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, values);

    console.log('TCL: getShiftsData -> res', res);
    return res.data;
  } catch (error) {
    console.log('TCL: getShiftsData -> error', error);
    console.log('TCL: getShiftsData -> error.response', error.response);
  }
};

export const editShiftData = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {SHIFT_KY, START_TIME, END_TIME, BREAK_TIME},
  },
) => {
  console.log('TCL: values', values);

  try {
    const res = await axios.post(`${API_ENDPOINT_DLETA}`, values);
    console.log('TCL: res', res);
    return res.data;
  } catch (error) {
    console.log('TCL: editShiftsData -> error.response', error.response);
  }
};

export const AddShiftData = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {
      PARENT_CLIENT_KY,
      CLIENT_KY,
      CADDR_KY,
      HIFT_DATE,
      START_TIME,
      END_TIME,
      BREAK_TIME,
      COMMENT,
    },
  },
) => {
  try {
    const response = await axios.post(`${API_ENDPOINT_DLETA}`, values);
    return response.data;
  } catch (error) {
    console.log('TCL: addShiftsData -> error.response', error.response);
  }
};

export const getPickerList = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  try {
    const response = await axios.post(`${API_ENDPOINT_DLETA}`, values);
    return response;
  } catch (error) {
    console.log('TCL: getPickerList -> error.response', error.response);
  }
};

export const getBilling = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  try {
    const response = await axios.post(`${API_ENDPOINT_DLETA}`, values);
    console.log('TCL: response', response);
    return response.data;
  } catch (error) {
    console.log('TCL: getPickerList -> error.response', error.response);
  }
};

export const clockIn = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  try {
    const response = await axios.post(`${API_ENDPOINT_DLETA}`, values);
    console.log('TCL: clockIn', response);
    return response.data;
  } catch (error) {
    console.log('TCL: clockIn -> error.response', error.response);
  }
};
