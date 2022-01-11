import * as authApi from '../api/AuthApi';
import * as AsyncStorageProvider from '../cache/AsyncStorageProvider';
import {Platform} from 'react-native';
export const login = async ({email, password}) => {
  console.log('TCL: login -> {email, password}', {email, password});
  let OS = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';

  let AllDAta = {
    REQ_NAME: 'IC_LOGIN',
    REQ_PARAMS: {
      USER_ID: email,
      PASSWORD: password,
      OS,
      PUSH_KEY: '123907133232132060',
      IMEI: '213213',
    },
  };
  const user = await authApi.login(AllDAta);
  console.log('TCL: login -> user', user);
  await AsyncStorageProvider.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logout = async () => {
  let done = await AsyncStorageProvider.removeItem('currentUser');
  return done;
};

export const forgetPassword = async ({EMAIL, PHONE}) => {
  let allDate = {
    REQ_NAME: 'IC_FORGOT_PASSWORD',
    REQ_PARAMS: {EMAIL, PHONE},
  };
  let result = await authApi.forgetPassword(allDate);
  return result;
};

export const getProfile = async (
  value = {
    REQ_TOKEN,
    REQ_NAME,
  },
) => {
  let result = await authApi.getProfile(value);
  return result;
};

export const EditProfile = async (
  value = {REQ_TOKEN, REQ_NAME, REQ_PARAMS},
) => {
  let result = await authApi.EditProfile(value);
  return result;
};
