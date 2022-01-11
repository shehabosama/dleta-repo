import AsyncStorage from '@react-native-community/async-storage';
export const clear = () => AsyncStorage.clear();

export const setItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
    let insertedData = await getItem(key);
    return insertedData;
  } catch (e) {
    console.log('TCL: setItem -> error', e);
    throw e;
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log('TCL: setItem -> error', error);
    return false;
  }
};
export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      throw 'noData';
    }
  } catch (e) {
    console.log('TCL: getItem -> error', e);
    throw e;
  }
};

export const getFCMToken = async () => {
  let token = null;

  try {
    token = JSON.parse(await AsyncStorage.getItem('@fcmToken'));
  } catch (error) {
    console.log('AsyncStorage#getItem error: ', error.message);
  }
  return token;
};

export const saveFCMToken = async token => {
  try {
    await AsyncStorage.setItem('@fcmToken', JSON.stringify(token));
  } catch (error) {
    console.log('AsyncStorage#setItem error: ', error.message);
  }
};

export const deleteFCMToken = async () => {
  try {
    await AsyncStorage.removeItem('@fcmToken');
    return true;
  } catch (error) {
    console.log('AsyncStorage#removeItem error: ', error.message);
    return false;
  }
};
