package com.awesomeproject;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;

import com.facebook.common.logging.FLog;
import com.facebook.react.common.network.OkHttpCallUtil;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nullable;

import okhttp3.FormBody;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okhttp3.ws.WebSocket;
import okhttp3.ws.WebSocketCall;
import okhttp3.ws.WebSocketListener;
import okio.Buffer;


public class WebSocketService extends Service {
    private static final String TAG = "WebSocketService";
    private NotificationManager nm;
    private @Nullable WebSocket mWebSocket;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        nm= (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        Notification n=new Notification.Builder(getApplicationContext()).build();
        startForeground(R.mipmap.ic_launcher, n);
        new Thread(){
            @Override
            public void run() {
                super.run();//
                String url="ws://dev.devicehms.com:9864";
                OkHttpClient mHttpClient = new OkHttpClient.Builder()
                        .connectTimeout(10, TimeUnit.SECONDS)
                        .writeTimeout(10, TimeUnit.SECONDS)
                        .readTimeout(0, TimeUnit.MINUTES) // Disable timeouts for read
                        .build();

                final Request request = new Request.Builder().url(url).build();
                WebSocketCall call = WebSocketCall.create(mHttpClient, request);
                call.enqueue(new WebSocketListener() {
                    @Override
                    public void onOpen(WebSocket webSocket, Response response) {
                        mWebSocket = webSocket;
                        try {
                            mWebSocket.sendMessage(RequestBody.create(WebSocket.TEXT,"1599540857"));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onFailure(IOException e, Response response) {
                        System.out.println("onFailure"+e.getMessage());
                    }

                    @Override
                    public void onMessage(ResponseBody response) throws IOException {
                        if (response.contentType() != WebSocket.TEXT) {
                            FLog.w(TAG, "Websocket received unexpected message with payload of type " + response.contentType());
                            return;
                        }

                        String message = null;
                        try {
                            message = response.source().readUtf8();
                        } finally {
                            response.close();
                        }
                        if (message!=null)
                            alarm(message);

                    }

                    @Override
                    public void onPong(Buffer payload) {
                        // ignore
                    }

                    @Override
                    public void onClose(int code, String reason) {
                        mWebSocket = null;
                    }
                });
            }
        }.start();
    }

    private void alarm(String message){
        Notification n=new Notification.Builder(getApplicationContext()).setContentText(message).build();
        nm.notify(R.mipmap.ic_launcher,n);
    }
}
