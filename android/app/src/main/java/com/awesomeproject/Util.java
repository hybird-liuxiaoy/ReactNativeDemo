package com.awesomeproject;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

/**
 * Created by liuxy on 8/5/16.
 */
public class Util {
    //发送事件到JavaScript
    public static void A(ReactContext reactContext) {
        //原生模块可以在没有被调用的情况下往JavaScript发送事件通知,JavaScript模块可以通过Subscribablemixin的addListenerOn方法来接受事件。
        WritableMap params = Arguments.createMap();
        sendEvent(reactContext, "keyboardWillShow", params);
    }

    private static void sendEvent(ReactContext reactContext,
                                  String eventName,
                                  @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
