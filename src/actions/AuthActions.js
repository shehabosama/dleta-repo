 import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';
 import * as authRepo from '../repo/AuthRepo';
// import * as errors from '../utils/Errors';
// import * as notificationRepo from '../repo/NotificationRepo';

export const signIn = (values, navigation) => async dispatch => {
  console.log('TCL: values', values);
  try {
    //  robinella52@gmail.com
    const user = await authRepo.login(values);
    //await notificationRepo.subscribe(user);
    dispatch({type: LOGIN_SUCCESS, payload: user});
   // navigation.navigate('Auth');
  } catch (error) {
    console.log('TCL: error', error);
    dispatch({
      type: LOGIN_FAIL,
      payload: 'Error in Email or UserName',
    });
  }
};
export const autoLogin = user => async dispatch => {
  // try {
  //   await notificationRepo.subscribe(user);
  //   dispatch({type: LOGIN_SUCCESS, payload: user});
  // } catch (error) {
  //   console.log('AutoLoginError', error);
  // }
};
export const cleanError = () => async dispatch => {
 // dispatch({type: LOGIN_FAIL, payload: ''});
};

export const logout = async token => async (dispatch, getState) => {
  // try {
  //   notificationRepo.unSubscribe(token);
  //   const done = await authRepo.logout();
  //   dispatch({type: LOGOUT});
  // } catch (error) {
  //   console.log('AuthLogoutError', error);
  // }
};
