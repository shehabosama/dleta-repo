import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
  FlatList,
  Platform,
  Text,
} from 'react-native';
import EditShiftForm from './EditShiftForm';

import bgSrc from '../../assets/images/top.png';
import * as ShiftsRepo from '../../repo/ShiftsRepo';
import {
  AppContainer,
  CalendarStrip,
  Header,
  ShiftCardOfList,
} from '../../genralComponents';

import styles from './style';
import {connect} from 'react-redux';
import {autoLogin} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/responsiveDimensions';
import {RectButton} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import GenralModal from '../../genralComponents/Modal';
import Geolocation from 'react-native-geolocation-service';

class ShiftScreen extends Component {
  constructor(props) {
    const {item} = props.navigation.state.params;
    super(props);
    this.state = {
      location: {},
      showLoading: false,
      headDay: 'View SHIFT',
      showModal: false,
      shift: item,
      modalVisible: false,
      startTime: item.START_TIME,
      endTime: item.END_TIME,
      breakTime: item.BREAK_TIME,
    };
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async isClockOut => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) return;
    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log({latitude, longitude});
          if (isClockOut) {
            this.clockOut({LAT: latitude, LONG: longitude});
          } else {
            this.clockIn({LAT: latitude, LONG: longitude});
          }
        },
        error => {
          this.setState({loading: false});
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };
  clockIn = async position => {
    const item = this.state.shift;
    let values = {
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_CLOCK_IN',
      REQ_PARAMS: {
        SHIFT_KY: item.PKY,
        START_TIME: item.START_TIME,
        ...position,
      },
    };
    const resp = await ShiftsRepo.clockIn(values);
    if (resp.RESULT === 'SUCCESS') {
      let shift = this.state.shift;
      shift.CLOCK_STATUS = 'IN';
      this.setState({loading: false, shift});
    }
    console.log('TCL: clockIn -> values', values, resp);
  };

  clockOut = async position => {
    const item = this.state.shift;
    let values = {
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_CLOCK_OUT',
      REQ_PARAMS: {
        SHIFT_KY: item.PKY,
        END_TIME: item.END_TIME,
        BREAK_TIME: this.state.New_BREAK_TIME,
        ...position,
      },
    };
    console.log('TCL: values', values);
    const resp = await ShiftsRepo.clockIn(values);
    if (resp.RESULT === 'SUCCESS') {
      let {shift} = this.state;
      shift.CLOCK_STATUS = 'OUT';
      this.setState({loading: false, shift});
    }
    console.log('TCL: clockIn -> values', values, resp);
  };
  renderItem = ({head, value}) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveHeight(11),
        backgroundColor: '#FFF',
        borderColor: '#E3E3E3',
        borderWidth: 0.5,
      }}>
      <Text style={{fontSize: 20, color: '#2E3851'}}>{head}</Text>
      <Text style={{fontSize: 18, color: '#D2D2D2'}}>{value}</Text>
    </View>
  );
  ClientName = () => {
    const {item} = this.props.navigation.state.params;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          height: responsiveHeight(20),
        }}>
        <Text
          style={{
            fontSize: 25,
            color: '#FFF',
          }}>
          {`Client : `}{' '}
          <Text style={{fontSize: 18, color: '#304155'}}>
            {item.CLIENT_NAME}
          </Text>
        </Text>
      </View>
    );
  };
  renderDone = () => {
    return (
      <RectButton
        onPress={this.props.navigation.goBack}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(8),
          backgroundColor: '#30415D',
        }}>
        <Text style={{color: '#FFF'}}>Done</Text>
      </RectButton>
    );
  };

  renderEdit = () => {
    return (
      <RectButton
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#F6AC2F',
          alignItems: 'center',
          height: responsiveHeight(8),
        }}
        onPress={() => {
          if (!this.state.loading) {
            if (this.state.shift.CLOCK_STATUS === 'NONE') {
              this.getLocation(false);
            } else {
              this.setState({modalVisible: true});
            }
          }
        }}>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{color: '#000'}}>
            {this.state.shift.CLOCK_STATUS === 'NONE'
              ? 'Clock In'
              : 'Clock Out'}
          </Text>
        )}
      </RectButton>
    );
  };
  renderDialog = () => {
    return <View></View>;
  };

  onDecline() {
    this.setState({showModal: false});
  }

  content = () => {
    return (
      <ImageBackground style={styles.wallpaperPicture} source={bgSrc}>
        <Header {...this.props} showBack={true} head={this.state.headDay} />
        <this.ClientName />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              width: responsiveWidth(80),
            }}>
            <this.renderItem
              head="Department"
              value={this.state.shift.CLIENT_NAME}
            />
            <this.renderItem
              head="Sift Date"
              value={this.state.shift.SHIFT_DATE}
            />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: responsiveHeight(11),
              }}>
              <this.renderItem
                head="Start time"
                value={this.state.shift.START_TIME}
              />
              <this.renderItem
                head="Break"
                value={this.state.shift.BREAK_TIME}
              />
              <this.renderItem
                head="End time"
                value={this.state.shift.END_TIME}
              />
            </View>
            <this.renderItem
              head="Patient"
              value={this.state.shift.PATIENT_NAME}
            />

            <this.renderItem head="Address" value={this.state.shift.CADDR} />

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                alignSelf: 'stretch',
                alignItems: 'stretch',
                height: responsiveHeight(11),
              }}>
              <this.renderDone />
              {this.state.shift.CLOCK_STATUS != 'OUT' && <this.renderEdit />}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  onEditAction = ({startTime, endTime, breakTime}) => {
    // console.log('StartTimeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', startTime);
    var {shift} = this.state;
    // shift.START_TIME = startTime;
    shift.BREAK_TIME = breakTime;
    // shift.END_TIME = endTime;

    this.setState(
      {
        modalVisible: !this.state.modalVisible,
        New_BREAK_TIME: breakTime,
      },
      () => {
        this.getLocation(true);
        this.setState({shift: shift});
      },
    );
  };

  onRequestClose = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <AppContainer>
        <this.content />
        {modalVisible && (
          <GenralModal
            modalVisible
            onRequestClose={this.onRequestClose}
            height={30}>
            <EditShiftForm
              shift={this.state.shift}
              onRequestClose={this.onRequestClose}
              EditAction={this.onEditAction}
            />
          </GenralModal>
        )}
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = dispatch => ({
  autoLogin: bindActionCreators(autoLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftScreen);
