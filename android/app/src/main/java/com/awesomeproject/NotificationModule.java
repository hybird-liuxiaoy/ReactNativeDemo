package com.awesomeproject;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 原生组件
 * Created by liuxy on 8/4/16.
 */
public class NotificationModule extends ReactContextBaseJavaModule {

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public void alarm(String message) {
        Notification n=new Notification.Builder(getReactApplicationContext()).setContentText(message).build();
        NotificationManager nm= (NotificationManager) getReactApplicationContext().getSystemService(Context.NOTIFICATION_SERVICE);
        nm.notify(R.mipmap.ic_launcher,n);
    }
}