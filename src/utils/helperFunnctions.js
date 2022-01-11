import {GOOGLE_KEY, API_ENDPOINT_GATEWAY} from './Config';
import {NativeModules} from 'react-native';
import { getUniqueId } from 'react-native-device-info';

export function getPlaceName(latitude, longitude) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=ar`,
  )
    .then(res => res.json())
    .then(json => {
      if (json.status !== 'OK') {
        throw new Error(`Geocode error: ${json.status}`);
      }

      const formattedAddress = json.results[0].formatted_address;

      if (formattedAddress) {
        return [formattedAddress, '', ''];
      }
      return [
        json.results[1].address_components[0].short_name,
        ' ',
        json.results[1].address_components[1].short_name,
      ];
    })
    .catch(error => {
      console.log(
        'TCL: getPlaceName -> error',
        JSON.parse(JSON.stringify(error)),
      );
    });
}

export function makeUri(path) {
  return `${API_ENDPOINT_GATEWAY + path}`;
}

// export function getImei(){
//   const Testm = NativeModules.TestBridge;
//   Testm.getImei(async(string) =>{
//     return string;
//   });
// }

export async function getUniqueCode(){
  try{      
      return getUniqueId();
  }catch(error){
    console.log("errorrrrrr",error);
    
  }
  
}
