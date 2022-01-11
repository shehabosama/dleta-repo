/* eslint-disable no-undef */
import * as ShiftsApi from '../api/ShiftsApi';
export const getShiftsDataBySTART_DATEAndEND_DATE = async (
  values = {REQ_ID, REQ_TOKEN, REQ_NAME, REQ_PARAMS: {START_DATE, END_DATE}},
) => {
  const Data = await ShiftsApi.getShiftsData(values);
  console.log('TCL: getShiftsDataBySTART_DATEAndEND_DATE -> Data', Data);

  return Data;
};

export const editShitRepo = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {SHIFT_KY, START_TIME, END_TIME, BREAK_TIME},
  },
) => {
  const Data = await ShiftsApi.editShiftData(values);
  console.log('TCL: getShiftsDataBySTART_DATEAndEND_DATE -> Data', Data);

  return Data;
};

export const addShitRepo = async (
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
  const Data = await ShiftsApi.AddShiftData(values);
  return Data;
};

export const getPickerList = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  const Data = await ShiftsApi.getPickerList(values);
  return Data;
};

export const getBilling = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  const Data = await ShiftsApi.getBilling(values);
  return Data;
};

export const clockIn = async (
  values = {
    REQ_TOKEN,
    REQ_NAME,
    REQ_PARAMS: {},
  },
) => {
  const Data = await ShiftsApi.clockIn(values);
  return Data;
};
