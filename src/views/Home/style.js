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
});

export default styles;
