package com.myapp.battery;

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;


public class BatteryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    //battery module constructor
    BatteryModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "BatteryModule";
    }

    private Intent getBatteryIntent() {
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);

        return reactContext.registerReceiver(null, filter);
    }

    //function to fetch battery level
    //battery percentage
    @ReactMethod
    public void getBatteryLevel(Promise promise) {

        BatteryManager manager = (BatteryManager)reactContext.getSystemService(
            Context.BATTERY_SERVICE);
        
        int level = manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
        promise.resolve(level);

    }

    //function to get battery charging state
    //charging state
    @ReactMethod 
    public void getChargingStatus(Promise promise) {

        Intent battery = getBatteryIntent();

        int status = battery.getIntExtra(BatteryManager.EXTRA_STATUS, -1);

        boolean charging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;
        
        promise.resolve(charging);

    }

    //function to get battery heath
    //Battery health
    @ReactMethod
    public void getBatteryHealth(Promise promise) {

        Intent battery = getBatteryIntent();

        int health = battery.getIntExtra(BatteryManager.EXTRA_HEALTH, -1);

        String result;

        switch(health) {
            case BatteryManager.BATTERY_HEALTH_GOOD: 
                result = "GOOD";
                break;
            case BatteryManager.BATTERY_HEALTH_OVERHEAT:
                result = "OVERHEAT";
                break;
            case BatteryManager.BATTERY_HEALTH_DEAD:
                result = "DEAD";
                break;
            case BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
                result = "OVER_VOLTAGE";
                break;
            case BatteryManager.BATTERY_HEALTH_COLD:
                result = "COLD";
                break;
            default:
                result = "UNKNOWN";
        }

        promise.resolve(result);

    }

    //function to get battery tempelature
    @ReactMethod
    public void getBatteryTemperature(Promise promise) {
        Intent battery = getBatteryIntent();

        int temp = battery.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0);

        promise.resolve(temp/10.0);

    }

    //function to get battery voltage 
    @ReactMethod
    public void getBatteryVoltage(Promise  promise) {

        Intent battery = getBatteryIntent();
        int voltage = battery.getIntExtra(BatteryManager.EXTRA_VOLTAGE, 0);

        promise.resolve(voltage);

    } 

    //Battery Technology
    @ReactMethod 
    public void getBatteryTechnology(Promise promise) {
        Intent battery = getBatteryIntent();

        String tech = battery.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY);

        promise.resolve(tech);

    }

    //Current (Android 5+) 
    @ReactMethod
    public void getBatteryCurrent(Promise promise) {

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            BatteryManager manager = (BatteryManager)reactContext.getSystemService(
                Context.BATTERY_SERVICE
            );

            int current = manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CURRENT_NOW);

            promise.resolve(current);

        }else {
            promise.resolve(0);
        }

    }

    //Charger counter
    @ReactMethod
    public void getChargerCounter(Promise promise) {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {

            BatteryManager manager = (BatteryManager)reactContext.getSystemService(
                Context.BATTERY_SERVICE);

            int counter = manager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CHARGE_COUNTER);

            promise.resolve(counter);
            
        }else {
            promise.resolve(0);
        }
    }

}