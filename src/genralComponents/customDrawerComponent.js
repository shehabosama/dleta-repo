import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';
import {connect} from 'react-redux';
import {autoLogin} from '../actions/AuthActions';
import {bindActionCreators} from 'redux';

class customDrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      index: 0,
    };
  }
  render() {
    console.log('customDrawerComponent', this.state, this.props);

    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/images/drawer.png')}
          style={{
            height: responsiveHeight(100),
            resizeMode: 'contain',
          }}>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              paddingTop: 40,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/images/user.png')}
              style={{
                height: 120,
                paddingTop: 60,
                width: 120,
                borderRadius: 50,
              }}
            />
            {this.props.currentUser && (
              <Text style={{fontSize: 24, color: '#808080', paddingTop: 10}}>
                {this.props.currentUser.FNAME} {this.props.currentUser.LNAME}
              </Text>
            )}
          </View>
          <ScrollView style={{paddingTop: 20}}>
            <DrawerItems {...this.props} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
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
)(customDrawerComponent);
