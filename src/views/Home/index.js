import React, {Component} from 'react';
import {ActivityIndicator, ImageBackground, Text} from 'react-native';

import bgSrc from '../../assets/images/wallpaper.png';
import Container from '../../genralComponents/container';

import * as AsyncStorageProvider from '../../cache/AsyncStorageProvider';
import {connect} from 'react-redux';
import {autoLogin} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';

class Home extends Component {
  render() {
    console.log('home', this.props);
    return (
      <Container scroll={true}>
        <Text>Home1</Text>
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
)(Home);
