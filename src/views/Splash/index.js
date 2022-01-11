import React, {Component} from 'react';
import {ActivityIndicator, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import bgSrc from '../../assets/images/wallpaper.png';
import Container from '../../genralComponents/container';
import styles from './style';
import * as AsyncStorageProvider from '../../cache/AsyncStorageProvider';
import {autoLogin} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';

class SplashScreen extends Component {
  componentDidMount() {
    this.checkUser();
  }
  checkUser = async () => {
    try {
      currentUser = await AsyncStorageProvider.getItem('currentUser');
      if (currentUser) {
        this.props.autoLogin(JSON.parse(currentUser));
        this.props.navigation.navigate('Auth');
      } else {
        this.props.navigation.navigate('NotAuth');
      }
    } catch (error) {
      this.props.navigation.navigate('NotAuth');
    }
  };

  render() {
    return (
      <Container scroll={true}>
        <ImageBackground
          style={styles.wallpaperPicture}
          resizeMode="contain"
          source={bgSrc}>
          <ActivityIndicator color="snow" size={50} />
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = dispatch => ({
  autoLogin: bindActionCreators(autoLogin, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
