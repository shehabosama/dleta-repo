import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {responsiveWidth, responsiveHeight} from '../utils/responsiveDimensions';

class GenralModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: props.modalVisible,
    };
  }

  onRequestClose = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
    this.props.onRequestClose();
  };

  render() {
    if (!this.props.modalVisible) return null;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.onRequestClose}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={this.onRequestClose}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContainer,
                  {height: responsiveHeight(this.props.height)},
                ]}>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(83, 86, 86,.5)',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    justifyContent: 'center',
  },
  modalContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
});
export default GenralModal;
