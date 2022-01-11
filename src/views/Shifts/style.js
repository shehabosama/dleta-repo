import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../utils/responsiveDimensions';
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  wallpaperPicture: {
    flex:1,
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    // resizeMode: 'cover',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: responsiveHeight(10),
  },
  fromContaner: {
    flex: 3,
    marginTop: responsiveHeight(5),
  },

  logoText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  logoText2: {
    color: '#291c45',
    fontSize: 30,
    marginVertical: responsiveHeight(0.25),
    alignSelf: 'center',
  },
  logoTextmail: {
    color: 'black',
    fontSize: 12,
  },
  buttonSubmitContainer: {
    marginTop: responsiveHeight(8),
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',

    paddingRight: responsiveWidth(3),
  },
  buttonSubmitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#344059',
    height: responsiveHeight(5.5),
    width: responsiveWidth(30),
    borderRadius: 20,
    marginRight: responsiveWidth(3),
  },
  buttonSubmitText: {
    color: 'white',
  },
  loginScreenText_forget_password: {
    fontSize: 10,
    color: '#000',
  },
  renderError: {
    height: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
    color: '#344059',
  },
  shiftView: {
    height,
    width,
  },
});

export default styles;
