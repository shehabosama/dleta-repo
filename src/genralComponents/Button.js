import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {View} from 'native-base';
const Button = ({onPress, children, processing, style}) => {
  const {textStyle, buttonStyle} = styles;
  console.log('ssssssssssssssssssssssssssssssssssssssssssss', processing);

  return processing ? (
    <View style={[buttonStyle, style]}>
      <ActivityIndicator color="white" />
    </View>
  ) : (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#F6AC2F',
    height: 50,
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export {Button};
