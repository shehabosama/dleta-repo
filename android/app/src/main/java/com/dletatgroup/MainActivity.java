package com.dletatgroup;

import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.TelephonyManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  private static MainActivity instance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    instance = this;

  }


  public String ImeiFunction() {
    TelephonyManager telephonyManager = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
    if (checkSelfPermission(android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
      // TODO: Consider calling
      //    Activity#requestPermissions
      // here to request the missing permissions, and then overriding
      //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
      //                                          int[] grantResults)
      // to handle the case where the user grants the permission. See the documentation
      // for Activity#requestPermissions for more details.
      return "please check your permission";
    }
    String imei = telephonyManager.getDeviceId();
    return imei ;
  }
  public static MainActivity getInstance(){
    return instance;
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "DletaTGroup";
  }
}
