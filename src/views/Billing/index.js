import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Text,
} from 'react-native';

import bgSrc from '../../assets/images/top.png';
import * as ShiftsRepo from '../../repo/ShiftsRepo';
import {
  AppContainer,
  CalendarStrip,
  Header,
  ShiftCardOfList,
} from '../../genralComponents';
import GillingCard from '../../genralComponents/GillingCard';

import {connect} from 'react-redux';
import {autoLogin} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';
import TimeForm from './TimeForm';
import moment from 'moment';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/responsiveDimensions';
import {RectButton} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import GenralModal from '../../genralComponents/Modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class ShiftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeModal: false,
      showLoading: false,
      allData: [],
      activeState: 'PAID',
      startTime: moment()
        .subtract(1, 'weeks')
        .startOf('week')
        .format('MM/DD/YYYY'),
      endTime: moment()
        .subtract(1, 'weeks')
        .endOf('week')
        .format('MM/DD/YYYY'),
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getInfo('PAID');
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  onRequestClose = () => {
    this.setState({showTimeModal: !this.state.showTimeModal});
  };
  reSetTimeInfo = ({startTime, endTime}) => {
    this.setState(
      {
        startTime,
        endTime,
        showTimeModal: !this.state.showTimeModal,
      },
      () => {
        this.getInfo('PAID');
      },
    );
  };
  renderTimeForm = () => {
    return this.state.showTimeModal ? (
      <GenralModal
        modalVisible={this.state.showTimeModal}
        onRequestClose={this.onRequestClose}
        height={30}>
        <TimeForm
          onRequestClose={this.onRequestClose}
          timeInfo={{
            startTime: this.state.startTime,
            endTime: this.state.endTime,
          }}
          afterSuccess={this.reSetTimeInfo}
        />
      </GenralModal>
    ) : null;
  };

  getInfo = async type => {
    const {TOKEN} = this.props.currentUser;
    this.setState({allData: [], showLoading: true});

    let values = {
      REQ_TOKEN: TOKEN,
      REQ_NAME: 'IC_GET_BILLINGS',
      REQ_PARAMS: {
        BILLING_TYPE: type,
        START_DATE: this.state.startTime,
        END_DATE: this.state.endTime,
      },
    };
    // '01/01/2019'

    let AllInfo = await ShiftsRepo.getBilling(values);
    this.setState({allData: AllInfo, showLoading: false});
    console.log('TCL: BillingScreen -> getInfo -> AllInfo', AllInfo);
  };

  headInfo = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          height: responsiveHeight(10),
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#304155',
          }}>
          {`For The period between `}
        </Text>
        <Text style={{fontSize: 15, color: '#FFF'}}>
          {`${this.state.startTime} To  ${this.state.endTime}`}
        </Text>
      </View>
    );
  };
  renderDone = () => {
    return (
      <RectButton
        onPress={() => {
          this.setState({activeState: 'PAID'}, () => {
            this.getInfo('PAID');
          });
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(8),
          backgroundColor:
            this.state.activeState == 'PAID' ? '#30415D' : '#FFF',
        }}>
        <Text
          style={{color: this.state.activeState == 'PAID' ? '#FFF' : '#000'}}>
          PAID
        </Text>
      </RectButton>
    );
  };

  renderEdit = () => {
    return (
      <RectButton
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: responsiveHeight(8),
          backgroundColor:
            this.state.activeState == 'UNPAID' ? '#30415D' : '#FFF',
        }}
        onPress={() =>
          this.setState({activeState: 'UNPAID'}, () => {
            this.getInfo('UNPAID');
          })
        }>
        <Text
          style={{color: this.state.activeState == 'UNPAID' ? '#FFF' : '#000'}}>
          UNPAID
        </Text>
      </RectButton>
    );
  };
  openPeriods = () => {
    return (
      <RectButton
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={this.onRequestClose}>
        <FontAwesome size={17} color="#31405F" name="clock-o" />
        <Text style={{color: '#31405F', paddingHorizontal: 5}}>Period</Text>
      </RectButton>
    );
  };
  ListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: responsiveHeight(20),
      }}>
      <Text style={{fontSize: 20}}>Empty List!</Text>
      <Text>You Have No Data At The moment</Text>
    </View>
  );
  renderItem = ({item, index}) => <GillingCard key={index} data={item} />;
  segmantedControl = () => {
    return (
      <View
        style={{
          alignItems: 'stretch',
          width: responsiveWidth(80),
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            height: responsiveHeight(55),
          }}>
          {this.state.showLoading ? (
            <View style={{padding: 20}}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={this.state.allData}
              renderItem={this.renderItem}
              keyExtractor={item => item.PKY}
              ListEmptyComponent={this.ListEmptyComponent}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignSelf: 'stretch',
            alignItems: 'stretch',
            height: responsiveHeight(8),
            elevation: 5,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(8),
              backgroundColor: '#30415D',
            }}>
            <Text style={{color: '#FFF'}}>TOTAL</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(8),
            }}>
            <Text style={{color: '#30415D', fontSize: 20}}>$ 00.00</Text>
          </View>
        </View>
      </View>
    );
  };
  content = () => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          width: responsiveWidth(100),
          height: responsiveHeight(45),
        }}
        source={bgSrc}>
        <Header
          {...this.props}
          rightIcon={this.openPeriods}
          head={'Billings'}
        />
        <this.headInfo />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              width: responsiveWidth(80),
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                alignSelf: 'stretch',
                alignItems: 'stretch',
                height: responsiveHeight(8),
                elevation: 5,
              }}>
              <this.renderDone />
              <this.renderEdit />
            </View>
            <this.segmantedControl />
          </View>
        </View>
      </ImageBackground>
    );
  };

  onEditAction = (startTime, endTime, breakTime) => {
    console.log('StartTimeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', startTime);
    var {shift} = this.state;
    shift.START_TIME = startTime;
    shift.BREAK_TIME = breakTime;
    shift.END_TIME = endTime;

    this.setState({
      modalVisible: !this.state.modalVisible,
      shift: shift,
    });
  };

  render() {
    return (
      <AppContainer>
        <this.content />
        <this.renderTimeForm />
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
