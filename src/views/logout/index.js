import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {connect} from 'react-redux';
import bgSrc from '../../assets/images/wallpaper.png';
import Container from '../../genralComponents/container';
import styles from './style';
import * as AsyncStorageProvider from '../../cache/AsyncStorageProvider';
import {logout} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';

class Logout extends Component {
  componentDidUpdate() {
    if (!this.props.currentUser) {
      this.props.navigation.navigate('NotAuth');
    }
  }
  render() {
    return (
      <Container scroll={true}>
        <View style={styles.wallpaperPicture}>
          {Alert.alert(
            'Log Out',
            'Are You Sure!',
            [
              {
                text: 'Cancel',
                onPress: this.props.navigation.goBack,
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  this.props.logout(this.props.currentUser.TOKEN);
                  this.props.navigation.navigate('NotAuth');
                },
              },
            ],
            {cancelable: false},
          )}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
