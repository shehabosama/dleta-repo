import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../../utils/responsiveDimensions';
const styles = StyleSheet.create({
  wallpaperPicture: {
    flex: 1,

    width: responsiveWidth(97),
    height: responsiveHeight(100),
    position: 'relative',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 2,
    // backgroundColor: 'gray',
    justifyContent: 'flex-end',
    // marginTop: -responsiveHeight(10),
    paddingLeft: responsiveWidth(4),
  },
  fromContaner: {
    flex: 3,
    marginTop: -1 * responsiveHeight(1),
  },

  logoText: {
    color: 'white',
    fontSize: 20,
  },
  logoText2: {
    color: 'white',
    fontSize: 30,
    marginVertical: responsiveHeight(0.25),
  },
  logoTextmail: {
    color: 'white',
    fontSize: 12,
  },
  buttonSubmitContainer: {
    // backgroundColor: 'gray',
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
    marginHorizontal: responsiveWidth(6),
    paddingVertical: responsiveWidth(3),

    fontSize: 15,
    color: '#000',
  },
  renderError: {
    height: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4),
    color: '#344059',
  },
});

export default styles;
