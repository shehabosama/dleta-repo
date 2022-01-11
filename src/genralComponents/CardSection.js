import React from 'react';
import {View, StyleSheet} from 'react-native';

const CardSection = props => {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    borderColor: '#E3E3E3',
    position: 'relative',
  },
});

export {CardSection};
