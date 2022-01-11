import React from 'react';
import {TextInput, View, StyleSheet, Text, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';

const DialogInput = ({
  onChangeText,
  error,
  items,
  valueName,
  labelName,
  nameIcon,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={nameIcon} style={styles.icon} />
      <Picker
        style={styles.inputStyle}
        selectedValue={value}
        onValueChange={onChangeText}>
        <Picker.Item label={'Select ...'} value={'emptySelect'} />
        {items.map((item, index) => (
          <Picker.Item
            key={index}
            label={item[labelName]}
            value={item[valueName]}
          />
        ))}
      </Picker>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default DialogInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F0EEEE',
    borderRadius: 5,
    marginHorizontal: 0,
    height: 45,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  icon: {alignSelf: 'center', fontSize: 22, marginHorizontal: 15},
  inputStyle: {left: 1, flex: 1, marginEnd: 10, fontSize: 18},
  errorText: {
    height: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
    color: '#344059',
  },
});
