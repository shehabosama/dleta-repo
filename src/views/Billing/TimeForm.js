import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {CardSection} from '../../genralComponents/CardSection';
import {DialogInput} from '../../genralComponents';
import {Button} from '../../genralComponents/Button';

// import Modal from "react-native-modal";
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimeInput from '../../genralComponents/DateTimeInput';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as shiftRepo from '../../repo/ShiftsRepo';
import Snackbar from 'react-native-snackbar';

class EditShifrDialog extends Component {
  constructor(props) {
    console.log('TCL: EditShifrDialog -> constructor -> props', props);
    super(props);
    this.state = {
      loading: false,
      isDateTimePickerVisible: false,
      startTime: props.timeInfo.startTime,
      endTime: props.timeInfo.endTime,
    };
  }

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    if (this.state.whichis === 'start') {
      this.setState({startTime: moment(date).format('MM/DD/YYYY')});
    }

    if (this.state.whichis === 'end') {
      this.setState({endTime: moment(date).format('MM/DD/YYYY')});
    }
    console.log('A date has been picked: ', date.toLocaleTimeString());
    this.hideDateTimePicker();
  };

  onEditShift = async () => {
    this.setState({loading: true});
    try {
      const values = {
        REQ_TOKEN: this.props.currentUser.TOKEN,
        REQ_NAME: 'IC_EDIT_SHIFT',
        REQ_PARAMS: {
          SHIFT_KY: this.props.shift.PKY,
          START_TIME: this.state.startTime,
          END_TIME: this.state.endTime,
          BREAK_TIME: this.state.breakTime,
        },
      };
      console.log('TCL: EditShifrDialog -> onEditShift -> values', values);
      let resData = await shiftRepo.editShitRepo(values);
      console.log('TCL: EditShifrDialog -> onEditShift -> resData', resData);
      if (resData.RESULT === 'SUCCESS') {
        Snackbar.show({
          title: 'Success Update Shift',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#dff0d8',
          color: '#3c763d',
        });
        this.props.EditAction(
          this.state.startTime,
          this.state.endTime,
          this.state.breakTime,
        );
        this.setState({loading: false});
      } else {
        Snackbar.show({
          title: 'Error In Update Shift',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#f2dede',
          color: '#a94442',
        });
      }
    } catch (error) {
      console.log('Error------>>', error);
    }
  };

  showDateTimePicker = myname => {
    this.setState({isDateTimePickerVisible: true, whichis: myname});
  };

  render() {
    const {onRequestClose} = this.props;

    return (
      <View style={styles.containerStyle}>
        <CardSection style={styles.cardSection}>
          <Text style={styles.textStyle}>Please Select The Period </Text>
        </CardSection>
        <CardSection>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'stretch',
              alignItems: 'stretch',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <DateTimeInput
              style={{flex: 1}}
              onChangeText={this.state.startTime}
              nameIcon="calendar"
              title={this.state.startTime}
              onPress={() => this.showDateTimePicker('start')}
            />
            <Text style={{paddingHorizontal: 5, alignSelf: 'center'}}>TO</Text>

            <DateTimeInput
              style={{flex: 1}}
              onChangeText={this.state.endTime}
              nameIcon="calendar"
              title={this.state.endTime}
              onPress={() => this.showDateTimePicker('end')}
            />
          </View>

          <DateTimePicker
            mode="date"
            display="default"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <View
            style={{
              //   backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}>
            <Button
              processing={this.state.loading}
              onPress={() =>
                this.props.afterSuccess({
                  startTime: this.state.startTime,
                  endTime: this.state.endTime,
                })
              }>
              Select
            </Button>

            <Button
              style={{backgroundColor: '#30415d'}}
              onPress={onRequestClose}>
              Close
            </Button>
          </View>
        </CardSection>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardSection: {
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: '#FFF',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: '#F6AC2F',
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditShifrDialog);
