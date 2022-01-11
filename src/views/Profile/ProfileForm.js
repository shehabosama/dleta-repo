import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CardSection} from '../../genralComponents/CardSection';
import {DialogInput} from '../../genralComponents';
import {Button} from '../../genralComponents/Button';
import moment from 'moment';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as AuthRepo from '../../repo/AuthRepo';
import Validation from './editProfileValidation';
import {ScrollView} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

class EditProfileDialog extends Component {
  constructor(props) {
    super(props);
    this.formikRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {}

  onSubmit = async (values, {setSubmitting, isSubmitting}) => {
    console.log('TCL: EditProfileDialog -> onSubmit -> values', values);
    const data = {
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_EDIT_PROFILE',
      REQ_PARAMS: values,
    };
    delete data.REQ_PARAMS.confirmPASSWORD;
    console.log('TCL: AddShiftDialog -> onSubmit -> data', data);
    try {
      let resData = await AuthRepo.EditProfile(data);
      console.log('TCL: AddShiftDialog -> onSubmit -> resData', resData);
      if (resData.RESULT === 'SUCCESS') {
        this.props.afterSuccess({
          EMAIL1: values.EMAIL,
          PHONE1: values.PHONE,
          ADDR1A: values.ADDR,
          ADDR1B: '',
          CITY1: values.CITY,
          ZIP1: values.ZIP,
        });
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
            <Text style={styles.textStyle}>MY PROFILE</Text>
          </CardSection>
          <CardSection>
            <DialogInput
              nameIcon="envelope-o"
              placeholder="E-mail"
              onChangeText={handleChange('EMAIL')}
              value={values.EMAIL}
              error={errors.EMAIL}
            />
            <DialogInput
              nameIcon="phone"
              placeholder="Phone Number"
              onChangeText={handleChange('PHONE')}
              value={values.PHONE}
              error={errors.PHONE}
            />
            <DialogInput
              nameIcon="map-marker"
              placeholder="Address"
              onChangeText={handleChange('ADDR')}
              value={values.ADDR}
              error={errors.ADDR}
            />
            <DialogInput
              nameIcon="cog"
              placeholder="Password"
              onChangeText={handleChange('PASSWORD')}
              value={values.PASSWORD}
              error={errors.PASSWORD}
            />
            <DialogInput
              nameIcon="cog"
              placeholder="Re-enter-Password"
              onChangeText={handleChange('confirmPASSWORD')}
              value={values.confirmPASSWORD}
              error={errors.confirmPASSWORD}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}>
              <Button processing={isSubmitting} onPress={handleSubmit}>
                Update
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

  render() {
    const {profileInfo} = this.props;
    return (
      <Formik
        ref={this.formikRef}
        initialValues={{
          EMAIL: profileInfo.EMAIL1,
          PHONE: profileInfo.PHONE1,
          ADDR: profileInfo.ADDR1A,
          CITY: 'Overland Park',
          ZIP: '08003',
          PASSWORD: '',
          confirmPASSWORD: '',
        }}
        validationSchema={Validation}
        onSubmit={(values, {setSubmitting, isSubmitting}) =>
          this.onSubmit(values, {setSubmitting, isSubmitting})
        }>
        {this.renderContent}
      </Formik>
    );
  }
}
const styles = StyleSheet.create({
  cardSection: {
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 40,
    paddingVertical: 12,
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
export default connect(mapStateToProps)(EditProfileDialog);
