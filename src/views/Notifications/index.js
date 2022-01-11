import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Text,
} from 'react-native';

import bgSrc from '../../assets/images/top.png';
import * as NotifyRepo from '../../repo/NotifyRepo';
import {
  AppContainer,
  CalendarStrip,
  Header,
  NotificationCardofList,
} from '../../genralComponents';

import styles from './style';
import {connect} from 'react-redux';
import {autoLogin} from '../../actions/AuthActions';
import {bindActionCreators} from 'redux';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/responsiveDimensions';
import {thisExpression} from '@babel/types';

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      headDay: 'Notificaion',
      allData: [],
      refresh: false,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.onNotificationData(new Date());
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  onNotificationData = async date => {
    this.setState({allData: [], showLoading: true});
    console.log('Date', date, this.props.currentUser);
    const {TOKEN} = this.props.currentUser;
    // let dayDate = moment(date).format('MM/DD/YYYY');
    let values = {
      REQ_TOKEN: TOKEN,
      REQ_NAME: 'IC_GET_NOTIFICATIONS',
    };
    let newData = await NotifyRepo.getNotificationData(values);
    this.setState({
      showLoading: false,
      allData: newData,
      // headDay: moment(date).format('MMM Do YY'),
    });
  };
  renderItem = ({item, index}) => (
    <NotificationCardofList
      key={index}
      data={item}
      token={this.props.currentUser.TOKEN}
      refreshAction={this.onNotificationData}
    />
  );
  onRefresh = () => {
    this.setState({refresh: true});
    setTimeout(() => {
      this.setState({refresh: false});
    }, 5000);
  };
  ListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: responsiveHeight(50),
      }}>
      <Text style={{fontSize: 20}}>Empty List!</Text>
      <Text>You Have No Notificaion At The moment</Text>
    </View>
  );
  content = () => {
    return (
      <ImageBackground style={styles.wallpaperPicture} source={bgSrc}>
        <Header {...this.props} head={this.state.headDay} />
        <View style={{paddingTop: 50, backgroundColor: 'transparent'}}>
          {this.state.showLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={this.state.allData}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              refreshing={this.state.refresh}
              ListEmptyComponent={this.ListEmptyComponent}
              onRefresh={this.onRefresh}
            />
          )}
        </View>
      </ImageBackground>
    );
  };
  render() {
    return (
      <AppContainer>
        <this.content />
      </AppContainer>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, null)(NotificationScreen);
