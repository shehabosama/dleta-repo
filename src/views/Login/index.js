import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { signIn, cleanError } from '../../actions/AuthActions';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import bgSrc from '../../assets/images/wallpaper.png';

import { AppContainer, AppInput } from '../../genralComponents';

import styles from './style';

import { Formik } from 'formik';
import ValidationSchema from './validation';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  loading:false};
  }
  componentDidMount() {
    this.checkUser();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      'TCL: LoginScreen -> componentDidUpdate -> prevProps, prevState, snapshot',
      prevProps,
      prevState,
      snapshot,
    );
    this.checkUser();
  }
  componentWillUnmount() {
    this.props.cleanError();
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
        onTextChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        value={values.email}
      />
    );
  };
  renderPassword = formikProps => {
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
        secureTextEntry={true}
        placeholder="Password"
        returnKeyType={'done'}
        autoCorrect={false}
        value={values.password}
        onTextChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={errors.password}
      />
    );
  };
  renderError = () => {
    return <Text style={styles.renderError}>{this.props.error}</Text>;
  };
  formBody = formikProps => {
    return (
      <View style={styles.fromContaner}>
        {this.renderError()}
        {this.renderEmail(formikProps)}
        {this.renderPassword(formikProps)}
        {this.actionRow(formikProps)}
      </View>
    );
  };
  LoginForm = () => {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values ) => {
          this.setState({loading:true},()=>{
            this.props.signIn(values, this.props.navigation);
            setTimeout(() => {
              this.setState({loading:false})
            }, 500);
          })
          
        }}>
        {this.formBody}
      </Formik>
    );
  };
  submitButton = formikProps => {
    const {
      handleChange,
      errors,
      touched,
      setSubmitting,
      handleSubmit,
      isSubmitting,
      values,
    } = formikProps; 
    return (
      <View style={styles.buttonSubmitButton}>
        {this.state.loading ? (
          <ActivityIndicator color="snow" size={20} />
        ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonSubmitButton}
              activeOpacity={1}>

              <Text style={styles.buttonSubmitText}>Login</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  };
  forgetButton = () => {
    return (
      <Text
        style={styles.loginScreenText_forget_password}
        onPress={() => {
          this.props.navigation.navigate('ForgetPass');
        }}>
        Forget Password
      </Text>
    );
  };
  actionRow = formikProps => {
    return (
      <View style={styles.buttonSubmitContainer}>
        <this.submitButton {...formikProps} />
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
        <this.LoginForm />
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
  error: state.auth.error,
});
const mapDispatchToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  cleanError: bindActionCreators(cleanError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
