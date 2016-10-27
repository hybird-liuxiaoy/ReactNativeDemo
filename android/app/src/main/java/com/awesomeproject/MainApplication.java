package com.awesomeproject;

import android.app.Application;
import android.content.Intent;
import android.view.View;

import com.example.pushlibrary.RNPushAndroidPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ReactShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
        //getReactNativeHost().getReactInstanceManager().createReactContextInBackground();
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNFetchBlobPackage(),
                    new RNPushAndroidPackage()
                    , new AnExampleReactPackage()// <-- 添加这一行，类名替换成你的Package类的名字. 注册模块
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    /**
     * 注册模块
     */
    class AnExampleReactPackage implements ReactPackage {

        @Override
        public List<Class<? extends JavaScriptModule>> createJSModules() {
            return Collections.emptyList();
        }

        @Override
        public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
            return Arrays.<ViewManager>asList(
                    new ReactImageManager()//注册UI
            );
        }

        @Override
        public List<NativeModule> createNativeModules(
                ReactApplicationContext reactContext) {
            List<NativeModule> modules = new ArrayList<>();

            modules.add(new MyToastModule(reactContext));//注册ToastModule

            return modules;
        }
    }

}
