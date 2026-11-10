package com.myapp.battery;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.BatteryManager;

public class BatteryReceiver extends BroadcastReceiver {

    public interface BatteryListener {
        
        void onBatteryChanged(
                int level,
                int scale,
                int status,
                int health,
                int plugged,
                int temperature,
                int voltage,
                String technology 
            );
    }

    private final BatteryListener listener;

    public BatteryReceiver(BatteryListener listener) {
        this.listener = listener;
    }

    @Override
    public void onReceive(Context context, Intent intent) {

        if(!Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
            return;
        }

        

        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        int health = intent.getIntExtra(BatteryManager.EXTRA_HEALTH, -1);
        int plugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        int temperature = intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1);
        int voltage = intent.getIntExtra(BatteryManager.EXTRA_VOLTAGE, -1);
        String technology = intent.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY);

        if(listener != null) {
            listener.onBatteryChanged(
                level,
                scale,
                status,
                health,
                plugged,
                temperature,
                voltage,
                technology
            );
        }
 
    }

}