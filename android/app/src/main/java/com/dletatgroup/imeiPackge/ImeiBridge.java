package com.dletatgroup.imeiPackge;

import androidx.annotation.NonNull;

import com.dletatgroup.MainActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ImeiBridge extends ReactContextBaseJavaModule {
    public ImeiBridge(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "TestBridge";
    }

    @ReactMethod
    public void getImei(Callback stringCallback) {
        String imei= MainActivity.getInstance().ImeiFunction();
        stringCallback.invoke(imei);
    }

}
