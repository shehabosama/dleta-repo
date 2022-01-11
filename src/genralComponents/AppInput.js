import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Image, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../utils/responsiveDimensions';
export default class UserInput extends Component {
  render() {
    return (
      <View
        style={{marginLeft: responsiveWidth(5), width: responsiveWidth(65)}}>
        <Text
          style={{
            height: responsiveHeight(3),
            paddingHorizontal: responsiveWidth(4),
            alignSelf: 'flex-end',
            color: '#344059',
          }}>
          {this.props.error}
        </Text>
        <Image source={this.props.source} />
        <TextInput
          {...this.props}
          editable={this.props.check}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            height: 45,
            paddingLeft: 25,
            borderRadius: 20,
            color: '#808080',
          }}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
          onChangeText={this.props.onTextChange}
          value={this.props.value}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
  error: PropTypes.string,
};
