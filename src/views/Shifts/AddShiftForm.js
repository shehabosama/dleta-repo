import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CardSection} from '../../genralComponents/CardSection';
import {DialogInput} from '../../genralComponents';
import {Button} from '../../genralComponents/Button';
import DialogPickerInput from '../../genralComponents/DialogPickerInput';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimeInput from '../../genralComponents/DateTimeInput';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as shiftRepo from '../../repo/ShiftsRepo';
import Validation from './AddShiftValidation';
import {ScrollView} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

class AddShiftDialog extends Component {
  constructor(props) {
    super(props);
    this.formikRef = React.createRef();
    this.state = {
      dateTimeType: '',
      loading: false,
      ClientListLoading: true,
      isDateTimePickerVisible: false,
      date: moment().format('l'),
      startTime: moment().format('hh:mm'),
      breakTime: moment().format(' hh:mm'),
      endTime: moment().format(' hh:mm'),
    };
  }

  componentWillMount() {
    this.getClientsList();
  }
  getClientsList = async () => {
    const ClientList = await shiftRepo.getPickerList({
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_GET_CLIENTS',
    });
    console.log(
      'TCL: AddShiftDialog -> getClientsList -> ClientList',
      ClientList.data,
    );
    this.setState({ClientList: ClientList.data, ClientListLoading: false});
  };
  GET_CLIENT_DERT = async PARENT_CLIENT_KY => {
    this.setState({CLIENT_DERT_List: false, CLIENT_ADDR_List: false});
    const CLIENT_DERT = await shiftRepo.getPickerList({
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_GET_CLIENT_DEPTS',
      REQ_PARAMS: {
        PARENT_CLIENT_KY,
      },
    });
    console.log(
      'TCL: AddShiftDialog -> GET_CLIENT_DERT -> CLIENT_DERT',
      CLIENT_DERT,
    );
    this.setState({CLIENT_DERT_List: CLIENT_DERT.data});
  };

  GET_CLIENT_ADDR = async (PARENT_CLIENT_KY, CLIENT_KY) => {
    this.setState({CLIENT_ADDR_List: false});

    const CLIENT_ADDR = await shiftRepo.getPickerList({
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_GET_CLIENT_SERVICE_ADDR',
      REQ_PARAMS: {
        PARENT_CLIENT_KY,
        CLIENT_KY,
      },
    });
    console.log(
      'TCL: AddShiftDialog -> GET_CLIENT_ADDR -> CLIENT_ADDR ',
      CLIENT_ADDR,
    );
    this.setState({CLIENT_ADDR_List: CLIENT_ADDR.data});
  };
  showDateTimePicker = (myname, type) => {
    this.setState({
      isDateTimePickerVisible: true,
      whichis: myname,
      dateTimeType: type,
    });
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    switch (this.state.whichis) {
      case 'date':
        this.setState({date: moment(date).format('MM/DD/YYYY')});
        break;
      case 'start':
        this.setState({startTime: moment(date).format('HH:mm')});
        break;
      case 'end':
        this.setState({endTime: moment(date).format('HH:mm')});
        break;
    }

    this.hideDateTimePicker();
  };

  onSubmit = async (values, {setSubmitting, isSubmitting}) => {
    const data = {
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_ADD_SHIFT',
      REQ_PARAMS: {
        PARENT_CLIENT_KY: values.client,
        CLIENT_KY: values.department,
        CADDR_KY: values.address,
        SHIFT_DATE: this.state.date,
        START_TIME: this.state.startTime,
        END_TIME: this.state.endTime,
        BREAK_TIME: values.breakTime,
        COMMENT: values.comments,
      },
    };
    console.log('TCL: AddShiftDialog -> onSubmit -> data', data);
    try {
      let resData = await shiftRepo.addShitRepo(data);
      console.log('TCL: AddShiftDialog -> onSubmit -> resData', resData);
      if (resData.RESULT === 'SUCCESS') {
        Snackbar.show({
          title: 'Success Add Shift',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#dff0d8',
          color: '#3c763d',
        });
        this.props.onRequestClose();
      } else {
        Snackbar.show({
          title: 'Error In Update Shift',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#f2dede',
          color: '#a94442',
        });
      }
      setSubmitting(false);
    } catch (error) {
      console.log('error', error);
      //   setSubmitting(false);
    }
  };
  renderContent = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    /* and other goodies */
  }) => {
    const {children, visible, onAccept, onDecline} = this.props;
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <CardSection style={styles.cardSection}>
            <Text style={styles.textStyle}>{children}</Text>
          </CardSection>
          <CardSection>
            {this.state.ClientList && (
              <DialogPickerInput
                onChangeText={PKY => {
                  if (PKY !== 'emptySelect') {
                    setFieldValue('client', PKY);
                    setFieldValue('department', '');
                    this.GET_CLIENT_DERT(PKY.toString());
                  }
                }}
                nameIcon="user"
                value={values.client}
                error={errors.client}
                items={this.state.ClientList}
                valueName="PKY"
                labelName="NAME"
              />
            )}
            {this.state.CLIENT_DERT_List && (
              <DialogPickerInput
                onChangeText={PKY => {
                  if (PKY !== 'emptySelect') {
                    setFieldValue('department', PKY);
                    setFieldValue('address', '');

                    this.GET_CLIENT_ADDR(values.client, PKY.toString());
                  }
                }}
                nameIcon="user"
                value={values.department}
                error={errors.department}
                items={this.state.CLIENT_DERT_List}
                valueName="PKY"
                labelName="NAME"
              />
            )}

            {this.state.CLIENT_ADDR_List && (
              <DialogPickerInput
                onChangeText={PKY => {
                  if (PKY !== 'emptySelect') {
                    setFieldValue('address', PKY);
                  }
                }}
                nameIcon="map-marker"
                value={values.address}
                error={errors.address}
                items={this.state.CLIENT_ADDR_List}
                valueName="PKY"
                labelName="ADDR"
              />
            )}

            <DateTimeInput
              nameIcon="clock-o"
              title={this.state.date}
              onPress={() => this.showDateTimePicker('date', 'date')}
            />
            <DateTimeInput
              nameIcon="clock-o"
              title={this.state.startTime}
              onPress={() => this.showDateTimePicker('start', 'time')}
            />
            <DialogInput
              nameIcon="clock-o"
              placeholder="break Time"
              onChangeText={handleChange('breakTime')}
              value={values.breakTime}
              error={errors.breakTime}
            />
            {/* <DateTimeInput
            nameIcon="clock-o"
            title={this.state.breakTime}
            onPress={() => this.showDateTimePicker('break', 'time')}
          /> */}
            <DateTimeInput
              nameIcon="clock-o"
              title={this.state.endTime}
              onPress={() => this.showDateTimePicker('end', 'time')}
            />
            <DialogInput
              placeholder="Your comments"
              onChangeText={handleChange('comments')}
              value={values.comments}
              error={errors.comments}
            />
            <View
              style={{
                //   backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
              <Button processing={isSubmitting} onPress={handleSubmit}>
                Add
              </Button>
              <Button
                style={{backgroundColor: '#30415d'}}
                onPress={this.props.onRequestClose}>
                Close
              </Button>
            </View>
          </CardSection>
        </View>
      </ScrollView>
    );
  };
  renderDateAndTimePickerToAllInputs = () => {
    return (
      <DateTimePicker
        mode={this.state.dateTimeType}
        display="default"
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
      />
    );
  };
  render() {
    return (
      <>
        <Formik
          ref={this.formikRef}
          initialValues={{
            client: '',
            department: '',
            breakTime: '00:00',
            address: '',
            comments: '',
          }}
          validationSchema={Validation}
          onSubmit={(values, {setSubmitting, isSubmitting}) =>
            this.onSubmit(values, {setSubmitting, isSubmitting})
          }>
          {this.renderContent}
        </Formik>
        {this.renderDateAndTimePickerToAllInputs()}
      </>
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
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
export default connect(mapStateToProps)(AddShiftDialog);
