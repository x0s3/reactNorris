package com.reactnorris.GoNorris;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import goNorris.GoNorris;

/**
 * Created by xose on 1/9/18.
 */

public class GoNorrisModule extends ReactContextBaseJavaModule {
    public GoNorrisModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GoNorris";
    }

    @ReactMethod
    public void getGoJokes(final Promise promise) {
        new Thread(new Runnable() {
            public void run() {
                String jokes = GoNorris.goNorris();
                promise.resolve(jokes);
            }
        }).start();
    }
}
