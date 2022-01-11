import React, {Component} from 'react';
import {View, Image, TouchableHighlight, Text} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('header', this.props);

    return (
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableHighlight
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../assets/images/menu.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableHighlight>
        </View>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 25,
              color: '#fff',
              textAlign: 'center',
              // marginTop: 30,
            }}>
            {this.props.head}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {this.props.showBack && (
            <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/images/arrow-left.png')}
                style={{width: 25, height: 20, paddingHorizontal: 20}}
              />
            </TouchableHighlight>
          )}
          {this.props.rightIcon && this.props.rightIcon()}
        </View>
      </View>
    );
  }
}
export default Header;
