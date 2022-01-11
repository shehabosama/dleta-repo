import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from '../utils/responsiveDimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'
import * as notifyRepo from '../repo/NotifyRepo'

export default class NotificationCard extends Component {

  state = {
    acceptLoading: false,
    rejectLoading: false,
  }

  renderEditNotify = async (reqName) => {

    const values = {
      REQ_TOKEN: this.props.token,
      REQ_NAME: reqName,
      REQ_PARAMS: {
        SHIFT_KY: String(this.props.data.PKY)
      }
    }
    try {
      console.log("Valueeeeeeeeeesssssssss", values);
      if (reqName === "IC_SHIFT_REQ_REJECT") {
        this.setState({ rejectLoading: true })
      } else {
        this.setState({ acceptLoading: true })
      }

      await notifyRepo.editNotificationRepo(values);
      // this.props.refreshAction();
    } catch (error) {
      console.log("ERror", error);
    } finally {
      this.setState({
        rejectLoading: false,
        acceptLoading: false
      })
    }

  }

  renderCircle = () => (
    <View
      style={{
        height: 20,
        width: 20,
        borderRadius: 25,
        backgroundColor: '#957CF1',
      }}
    />
  );

  renderDate = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon name="calendar" color="#7A7C91" />
      <Text style={{ color: '#7A7C91' }}>{moment(this.props.data.SHIFT_DATE).format('l')}</Text>
    </View>
  );
  renderDeparment = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ color: '#7A7C91' }}>Department : </Text>
        <Text style={{ color: '#DD7419' }}>{this.props.data.CLIENT_NAME}</Text>
      </View>
      {/* {this.renderPatient()} */}
    </View>
  );
  renderPatient = () => (
    <View style={{ flexDirection: 'row' }}>
      <Text> Patient : </Text>
      <Text style={{ color: 'orange' }}>john Die</Text>
    </View>
  );
  renderTimer = value => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{ height: 20, width: 20 }}
          source={require('../assets/images/timer.png')}
        />
        <Text style={{ color: '#7A7C91', fontSize: 10 }}>{value}</Text>
      </View>
    );
  };
  renderTimers = () => (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: -4,
      }}>
      {this.renderTimer(`Start : ${this.props.data.START_TIME}`)}
      {this.renderTimer(`Break : ${this.props.data.BREAK_TIME}`)}
      {this.renderTimer(`End : ${this.props.data.END_TIME}`)}
    </View>
  );

  renderClient = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ color: '#7A7C91' }}>Client : </Text>
      <Text style={{ color: '#DD7419' }}>{this.props.data.PARENT_CLIENT_NAME}</Text>
    </View>
  );

  rendershiftRequest = () => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: '#957CF1', fontSize: 16 }}>Shift Request</Text>
    </View>
  );

  renderClientAndTimer = () => (
    <View style={{ flexDirection: 'row' }}>{this.renderClient()}</View>
  );

  renderRejectButton = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          alignItems: 'stretch',
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}>
        {this.state.rejectLoading ? <ActivityIndicator color='black' /> :
          <TouchableOpacity
            onPress={() => this.renderEditNotify('IC_SHIFT_REQ_REJECT')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#30415D' }}>Reject</Text>
          </TouchableOpacity>}
      </View>
    );
  };
  renderAcceptButton = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#30415D',
          alignItems: 'stretch',
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}>
        {this.state.acceptLoading ? <ActivityIndicator color='white' /> :
          <TouchableOpacity
            onPress={() => this.renderEditNotify('IC_SHIFT_REQ_ACCEPT')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#FFF' }}>Accept</Text>
          </TouchableOpacity>}
      </View>
    );
  };
  render() {
    console.log("My propssssss", this.props);

    return (
      <View style={styles.cardContaner}>
        <View
          style={{ flex: 1, flexDirection: 'row', padding: responsiveWidth(3) }}>
          {this.renderCircle()}

          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            {this.rendershiftRequest()}
            {this.renderClientAndTimer()}
            {this.renderDeparment()}
            {this.renderDate()}
            {this.renderTimers()}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'stretch',

            height: responsiveHeight(6),
          }}>
          {this.renderAcceptButton()}
          {this.renderRejectButton()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContaner: {
    backgroundColor: 'white',
    width: responsiveWidth(90),
    alignSelf: 'center',
    // borderWidth: 1,
    elevation: 24,
  },
});
