import React from 'react';
import {
  TextInput,
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DateTimeInput = ({title, nameIcon, onPress, onChangeText, style}) => {
  return (
    <View style={[styles.dialogEditTextBackground, style]}>
      <Icon name={nameIcon} style={styles.dialogEditTextFeaterStyle} />
      <View style={styles.dialogEditTextText}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{fontSize: 13}}
            editable={false}
            onChangeText={onChangeText}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  dialogEditTextText: {
    left: 1,
    flex: 1,
    marginEnd: 10,
    fontSize: 18,
  },
  dialogEditTextFeaterStyle: {
    alignSelf: 'center',
    fontSize: 22,
    marginHorizontal: 15,
  },
  dialogEditTextBackground: {
    alignItems: 'center',
    backgroundColor: '#F0EEEE',
    borderRadius: 5,
    marginHorizontal: 0,
    height: 45,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
});
