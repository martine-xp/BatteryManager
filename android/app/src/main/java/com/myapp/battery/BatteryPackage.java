package com.myapp.battery;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;


// extending Reactpackage to the BatteryManager class
public class BatteryPackage implements ReactPackage {

    @Override 
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        
        //crating a list container for storing BatteryModules
        List<NativeModule> modules = new ArrayList<>();

        //inserting BatteryModule and BatteryManager to the modules container
        modules.add(new BatteryModule(reactContext));
        modules.add(new BatteryManager(reactContext));

        //returning the module container
        return modules;
        
        /*return Collections.singletonList(
            new BatteryModule(reactContext)
        );*/
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

} 

