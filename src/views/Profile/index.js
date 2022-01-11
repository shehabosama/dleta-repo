import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import GenralModal from '../../genralComponents/Modal';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/responsiveDimensions';
import {AppContainer, Header} from '../../genralComponents';
import bgSrc from '../../assets/images/top.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as authRepo from '../../repo/AuthRepo';
import {RectButton} from 'react-native-gesture-handler';
import {Button} from '../../genralComponents/Button';
import ProfileForm from './ProfileForm';
class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {viewLoading: true, viewEditProfile: false};
  }

  componentWillMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getInfo();
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  getInfo = async () => {
    let value = {
      REQ_TOKEN: this.props.currentUser.TOKEN,
      REQ_NAME: 'IC_GET_PROFILE',
    };
    let info = await authRepo.getProfile(value);
    console.log('TCL: ViewProfile -> getInfo -> info', info);
    this.setState({profileInfo: info[0], viewLoading: false});
  };
  onRequestClose = () => {
    this.setState({viewEditProfile: !this.state.viewEditProfile});
  };
  reSetProfileInfo = profileInfo => {
    this.setState({profileInfo});
  };
  renderEditForm = () => {
    return this.state.viewEditProfile ? (
      <GenralModal
        modalVisible={this.state.viewEditProfile}
        onRequestClose={this.onRequestClose}
        height={70}>
        <ProfileForm
          onRequestClose={this.onRequestClose}
          profileInfo={this.state.profileInfo}
          afterSuccess={this.reSetProfileInfo}
        />
      </GenralModal>
    ) : null;
  };
  renderItem = (Icon, name, value) => (
    <View style={styles.infoContener}>
      <View style={styles.infoItem}>
        <View style={styles.Icon}>
          <View
            style={{
              borderColor: '#31405F',
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              borderRadius: 100,
              borderWidth: 1,
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {Icon}
          </View>
        </View>
        <View style={styles.Value}>
          <Text style={{fontSize: 15, color: '#31405F', fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text style={{color: '#868485'}}>{value}</Text>
        </View>
      </View>
    </View>
  );
  renderItems = () => {
    const {profileInfo} = this.state;
    return this.state.viewLoading ? (
      <ActivityIndicator />
    ) : (
      <React.Fragment>
        {this.renderItem(
          <MaterialCommunityIcons
            size={20}
            color="#31405F"
            name="email-outline"
          />,
          'E-Mail',
          profileInfo.EMAIL1,
        )}
        {this.renderItem(
          <MaterialCommunityIcons
            size={20}
            color="#31405F"
            name="cellphone-iphone"
          />,
          'Phone Number',
          profileInfo.PHONE1,
        )}

        {this.renderItem(
          <Entypo name="location-pin" size={20} color="#31405F" />,
          'Address',
          `${profileInfo.ADDR1A} , ${profileInfo.CITY1} , ${profileInfo.ZIP1}`,
        )}
      </React.Fragment>
    );
  };
  openEdit = () => {
    return (
      <RectButton
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={this.onRequestClose}>
        <FontAwesome size={17} color="#31405F" name="edit" />
        <Text style={{color: '#31405F'}}>EDIT</Text>
      </RectButton>
    );
  };
  content = () => {
    const {currentUser} = this.props;
    return (
      <ImageBackground style={styles.wallpaperPicture} source={bgSrc}>
        <Header {...this.props} head={'MY PROFILE'} rightIcon={this.openEdit} />
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/user.png')}
            style={styles.avatar}
          />
          <Text
            style={
              styles.Name
            }>{`${currentUser.FNAME} ${currentUser.LNAME}`}</Text>
          {this.renderItems()}
        </View>
      </ImageBackground>
    );
  };
  render() {
    return (
      <AppContainer>
        <this.content />

        <this.renderEditForm />
      </AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  wallpaperPicture: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    alignItems: 'center',
  },
  content: {
    width: responsiveWidth(80),
    height: responsiveHeight(70),
    backgroundColor: '#FFF',
    marginTop: responsiveHeight(18),
    alignItems: 'center',
  },
  avatar: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    backgroundColor: '#FFF',
    marginTop: -1 * responsiveWidth(17),
    borderRadius: 100,
  },
  infoContener: {
    flex: 1,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    alignItems: 'stretch',
  },
  Name: {fontSize: 22, paddingVertical: 10, color: '#31405F'},
  infoItem: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E3E3E3',
    flexDirection: 'row',
  },
  Icon: {
    width: responsiveWidth(23),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // backgroundColor: 'red',
  },
  Value: {
    flex: 1,
    justifyContent: 'center',
  },
});
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
export default connect(mapStateToProps)(ViewProfile);
