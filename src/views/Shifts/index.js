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
  CircleButton,
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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AddShiftForm from './AddShiftForm';
import GenralModal from '../../genralComponents/Modal';
class ShiftScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      headDay: 'TODAY SHIFT',
      allData: [],
      refresh: false,
      showAddModal: false,
      selectedDate: new Date(),
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      setTimeout(() => {
        this.onDateSelected(this.state.selectedDate);
      }, 1);
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  onDateSelected = async date => {
    this.setState({allData: [], showLoading: true, selectedDate: date});
    console.log('Date', date, this.props.currentUser);
    const {TOKEN, REQ_ID} = this.props.currentUser;
    let dayDate = moment(date).format('MM/DD/YYYY');
    let values = {
      REQ_TOKEN: TOKEN,
      REQ_ID,
      REQ_NAME: 'IC_GET_SHIFTS',
      REQ_PARAMS: {START_DATE: dayDate, END_DATE: dayDate},
    };
    let newData = await ShiftsRepo.getShiftsDataBySTART_DATEAndEND_DATE(values);
    this.setState({
      showLoading: false,
      allData: newData,
      headDay: moment(date).format('MMM Do YY'),
    });
  };
  renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      key={index}
      onPress={() => {
        this.props.navigation.navigate('ViewShift', {
          item,
        });
      }}>
      <ShiftCardOfList data={item} />
    </TouchableWithoutFeedback>
  );
  onRefresh = () => {
    this.setState({refresh: true});
    setTimeout(() => {
      this.setState({refresh: false});
    }, 5000);
  };
  ListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: responsiveHeight(50),
      }}>
      <Text style={{fontSize: 20}}>Empty List!</Text>
      <Text>You Have No Shifts At The moment</Text>
    </View>
  );
  content = () => {
    return (
      <ImageBackground style={styles.wallpaperPicture} source={bgSrc}>
        <Header {...this.props} head={this.state.headDay} />
        <CalendarStrip
          onDateSelected={this.onDateSelected}
          startingDate={this.state.selectedDate}
        />
        {this.state.showLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.allData}
            renderItem={this.renderItem}
            keyExtractor={item => item.PKY}
            refreshing={this.state.refresh}
            ListEmptyComponent={this.ListEmptyComponent}
            onRefresh={this.onRefresh}
          />
        )}
      </ImageBackground>
    );
  };

  onRequestClose = () => {
    this.setState({showAddModal: !this.state.showAddModal});
  };
  renderAddForm = () => {
    return this.state.showAddModal ? (
      <GenralModal
        modalVisible={this.state.showAddModal}
        onRequestClose={this.onRequestClose}
        height={95}>
        <AddShiftForm onRequestClose={this.onRequestClose}>
          Add shift
        </AddShiftForm>
      </GenralModal>
    ) : null;
  };
  render() {
    return (
      <AppContainer>
        <this.content />
        <CircleButton onPress={this.onRequestClose} />
        {this.renderAddForm()}
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
