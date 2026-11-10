package com.myapp.battery;

import android.content.IntentFilter;
import android.content.Intent;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BatteryManager extends ReactContextBaseJavaModule 
    implements BatteryReceiver.BatteryListener {
    
    private final ReactApplicationContext reactContext;

    private BatteryReceiver batteryReceiver;

    public BatteryManager(ReactApplicationContext reactContext) {

        super(reactContext);

        android.util.Log.d("BatteryManager", "Receiver registered");

        this.reactContext = reactContext;

        batteryReceiver = new BatteryReceiver(this);

        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        reactContext.registerReceiver(batteryReceiver, filter);

    }
    
    @NonNull
    @Override
    public String getName() {
        return "BatteryManager";
    }

    @ReactMethod    
    public void getBatteryInfo(Promise promise) {
        promise.resolve("Battery receiver is running");
    }

    @Override
    public void onBatteryChanged(
        int level,
        int scale,
        int status,
        int health,
        int plugged,
        int temperature,
        int voltage,
        String technology
    ) {
        WritableMap map = Arguments.createMap();

        map.putInt("level", level);
        map.putInt("scale", scale);
        map.putInt("status", status);
        map.putInt("health", health);
        map.putInt("plugged", plugged);
        map.putInt("temperature", temperature);
        map.putInt("voltage", voltage);
        map.putString("technology", technology);

        reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("BatteryChanged", map);

    }

    @Override 
    public void invalidate() {
        super.invalidate();

        if(batteryReceiver != null) {
            reactContext.unregisterReceiver(batteryReceiver);
        }

    }

}