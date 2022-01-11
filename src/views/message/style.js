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
  subtitle:{
    width: responsiveWidth(100),
    marginTop:60,
    alignItems:'center'
  },
  subtitleText:{
    color:'white',
    fontSize:18
  },
  continer:{
    marginTop: responsiveHeight(10),
    width: responsiveWidth(80),
    alignSelf:'center',
    backgroundColor:"white",
    height: responsiveHeight(70),
    elevation:20
  }
});

export default styles;
