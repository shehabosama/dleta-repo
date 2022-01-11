import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {signIn, cleanError} from '../../actions/AuthActions';

import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';

import bgSrc from '../../assets/images/wallpaper.png';

import {AppContainer, AppInput} from '../../genralComponents';

import styles from './style';

import {Formik} from 'formik';
import ValidationSchema from './validation';

class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }
  componentDidMount() {
    this.checkUser();
  }
  checkUser = async () => {
    if (this.props.currentUser) {
      console.log(
        'TCL: SplashScreen -> checkUser -> this.props.currentUser',
        this.props.currentUser,
      );

      // this.props.navigation.navigate(
      //   'Home'
      //   // , {
      //   //   itemId: 86,
      //   //   otherParam: 'anything you want here',
      //   // }
      // );
    }
  };
  Logo = () => {
    return (
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Welcome to</Text>
        <Text style={styles.logoText2}>DELTA - GROUP</Text>
        <Text style={styles.logoTextmail}>Forget Password</Text>
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
        placeholder="Enter Code Number"
        returnKeyType={'done'}
        autoCorrect={false}
        onTextChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        value={values.email}
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
        //validationSchema={ValidationSchema}
        onSubmit={(values, {setSubmitting}) => {
          console.log('TCL: LoginScreen -> LoginForm -> values', values);
          this.props.navigation.navigate('Shift');
          //this.props.navigation.navigate();
          // setTimeout(() => {
          //   setSubmitting(false);
          // }, 1000);
          //this.props.signIn(values);
        }
        }
        >
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
        <TouchableOpacity onPress={handleSubmit} activeOpacity={1}>
          {isSubmitting ? (
            <ActivityIndicator color="snow" size={50} />
          ) : (
            <Text style={styles.buttonSubmitText}>Next  ></Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
 
  actionRow = formikProps => {
    return (
      <View style={styles.buttonSubmitContainer}>
        {this.submitButton(formikProps)}
        
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
        {/* <ActivityIndicator color="snow" size={50} /> */}
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


export default VerificationScreen;
