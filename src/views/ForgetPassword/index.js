import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import bgSrc from '../../assets/images/wallpaper.png';

import {AppContainer, AppInput} from '../../genralComponents';

import styles from './style';

import {Formik} from 'formik';
import ValidationSchema from './validation';
import {
  responsiveWidth,
  responsiveHeight,
} from '../../utils/responsiveDimensions';
import * as authRepo from '../../repo/AuthRepo';
class ForgetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  componentDidMount() {
    this.checkUser();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.checkUser();
  }
  checkUser = async () => {
    if (this.props.currentUser) {
      this.props.navigation.navigate('Home');
    }
  };
  Logo = () => {
    return (
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Welcome to</Text>
        <Text style={styles.logoText2}>DELTA - GROUP</Text>
        <Text style={styles.logoTextmail}>Please Sign In To Continue</Text>
      </View>
    );
  };

  renderEmail = formikProps => {
    const {
      handleChange,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      isSubmitting,
      values,
    } = formikProps;

    return (
      <AppInput
        placeholder="Username or Email"
        returnKeyType={'done'}
        autoCorrect={false}
        onTextChange={handleChange('EMAIL')}
        onBlur={handleBlur('EMAIL')}
        error={errors.EMAIL}
        value={values.EMAIL}
      />
    );
  };
  renderPhone = formikProps => {
    const {
      handleChange,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      isSubmitting,
      values,
    } = formikProps;
    return (
      <AppInput
        placeholder="Phone"
        returnKeyType={'done'}
        autoCorrect={false}
        value={values.PHONE}
        onTextChange={handleChange('PHONE')}
        onBlur={handleBlur('PHONE')}
        error={errors.PHONE}
      />
    );
  };
  renderError = () => {
    return <Text style={styles.renderError}>{this.props.error}</Text>;
  };
  formBody = formikProps => {
    return (
      <View style={styles.fromContaner}>
        {/* {this.renderError()} */}
        {this.renderEmail(formikProps)}
        <View
          style={{
            alignItems: 'center',
            width: responsiveWidth(75),
            paddingTop: responsiveHeight(3),
          }}>
          <Text style={{color: '#FFF'}}>OR</Text>
        </View>
        {this.renderPhone(formikProps)}
        {this.actionRow(formikProps)}
      </View>
    );
  };
  forgetPassword = (values, {setSubmitting}) => {
    console.log('TCL: ForgetScreen -> forgetPassword -> values', values);
    authRepo.forgetPassword(values);
  };
  ForgetForm = () => {
    return (
      <Formik
        initialValues={{
          EMAIL: '',
          PHONE: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={this.forgetPassword}>
        {this.formBody}
      </Formik>
    );
  };
  submitButton = formikProps => {
    const {
      handleChange,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      isSubmitting,
      values,
    } = formikProps;
    return (
      <View style={styles.buttonSubmitButton}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.buttonSubmitButton}
          activeOpacity={1}>
          {isSubmitting ? (
            <ActivityIndicator color="snow" size={50} />
          ) : (
            <Text style={styles.buttonSubmitText}>Next ></Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  forgetButton = () => {
    return (
      <View>
        <Text
          style={styles.loginScreenText_forget_password}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          Login
        </Text>
      </View>
    );
  };
  actionRow = formikProps => {
    return (
      <View style={styles.buttonSubmitContainer}>
        {this.submitButton(formikProps)}
        {this.forgetButton()}
      </View>
    );
  };
  content = () => {
    return (
      <ImageBackground
        style={styles.wallpaperPicture}
        resizeMode="contain"
        source={bgSrc}>
        <this.Logo />
        <this.ForgetForm />
      </ImageBackground>
    );
  };
  render() {
    return (
      <AppContainer scroll={true}>
        <this.content />
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  null,
)(ForgetScreen);
