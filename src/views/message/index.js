import React, { Component } from 'react';
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
    Header,
    NotificationCardofList,
} from '../../genralComponents';

import styles from './style';
import { connect } from 'react-redux';

import {
    responsiveHeight,
} from '../../utils/responsiveDimensions';

class MessageScreen extends Component {
    constructor(props) {
        super(props);
    }
    content = () => {
        return (
            <ImageBackground style={styles.wallpaperPicture} source={bgSrc}>
                <Header {...this.props} head='Message' />
                <View style={styles.subtitle}>
                    <Text style={styles.subtitleText}>We are happy to communicate with you</Text>
                </View>
                <View style={styles.continer}/>

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

export default connect(mapStateToProps, null)(MessageScreen);
