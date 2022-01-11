import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  StatusBar,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import connectionError from '../assets/images/connection-error.jpg';

import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: false};
  }
  componentDidMount() {
    this.checkInternet();
  }
  checkInternet = async () => {
    const isConnected = await NetInfo.isConnected.fetch();
    console.log('TCL: Container -> checkInternet -> isConnected', isConnected);
    this.setState({isConnected}, () => {
      NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
        this.setState({isConnected});
      });
    });
  };
  noConnection = () => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          width: responsiveWidth(97),
          height: responsiveHeight(100),
          position: 'relative',
          justifyContent: 'center',
        }}
        resizeMode="contain"
        source={connectionError}
      />
    );
  };
  render() {
    const {isConnected} = this.state;
    let AppView = this.props.scroll ? ScrollView : View;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}>
        <StatusBar
          backgroundColor="rgba(247, 172, 47,0.7)"
          barStyle="light-content"
        />

        <AppView
          style={{
            flex: 1,
            alignSelf: 'stretch',
            backgroundColor: 'transparent',
          }}>
          {isConnected ? this.props.children : this.noConnection()}
        </AppView>
      </SafeAreaView>
    );
  }
}
export default Container;
