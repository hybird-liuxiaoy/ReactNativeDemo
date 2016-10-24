package com.awesomeproject;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * 原生组件
 * Created by liuxy on 8/4/16.
 */
public class MyToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public MyToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyToastModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    //原生模块还支持一种特殊的参数——回调函数。它提供了一个函数来把返回值传回给JavaScript。
    @ReactMethod
    public void measureLayout(
            int tag,
            int ancestorTag,
            Callback errorCallback,
            Callback successCallback) {
        try {
            successCallback.invoke(tag, ancestorTag, "1", "2");
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
