import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';

export default class ShiftCard extends Component {
  renderCircle = () => (
    <View
      style={{height: 20, width: 20,borderRadius:100,backgroundColor:"#FBB812"}}
      
    />
  );

  renderLocation = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: responsiveWidth(6),
          width: responsiveWidth(6),
          marginHorizontal: -5,
        }}
        source={require('../assets/images/location.png')}
      />
      <Text style={{color: 'gray'}}>
        Nasr Street Building - Mokttam - Cairo
      </Text>
    </View>
  );
  renderDeparment = () => (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>Department : Company Name</Text>
      </View>
      {this.renderPatient()}
    </View>
  );
  renderPatient = () => (
    <View style={{flexDirection: 'row'}}>
      <Text> Patient : </Text>
      <Text style={{color: 'orange'}}>john Die</Text>
    </View>
  );
  renderTimer = () => (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{height: 20, width: 20, marginLeft: 'auto'}}
        source={require('../assets/images/timer.png')}
      />
      <Text style={{color: 'gray'}}>12:45</Text>
    </View>
  );

  renderClient = () => (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text>Client : </Text>
      <Text style={{color: 'orange'}}>Delta Group</Text>
    </View>
  );
  renderClientAndTimer = () => (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {this.renderClient()}
      {this.renderTimer()}
    </View>
  );
  render() {
    return (
      <View style={styles.cardContaner}>
        <View
          style={{
            width: responsiveHeight(3),
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          {this.renderCircle()}
        </View>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          {this.renderClientAndTimer()}
          {this.renderDeparment()}
          {this.renderLocation()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContaner: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: responsiveWidth(90),
    alignSelf: 'center',
    padding: responsiveWidth(3),
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E3E3',
  },
});
