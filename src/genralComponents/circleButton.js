import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';
import Icon from 'react-native-vector-icons/Ionicons';

import {RectButton} from 'react-native-gesture-handler';

const CircleButton = ({onPress}) => {
  return (
    <RectButton onPress={onPress} style={styles.CircleButton}>
      <Icon name="ios-add-circle" size={30} color="#FFF" />
    </RectButton>
  );
};

const styles = StyleSheet.create({
  CircleButton: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 100,
    bottom: 15,
    right: 15,
    backgroundColor: '#f7ac2f',
  },
});

export default CircleButton;
