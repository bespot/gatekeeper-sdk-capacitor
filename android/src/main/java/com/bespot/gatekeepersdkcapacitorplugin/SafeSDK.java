package com.bespot.gatekeepersdkcapacitorplugin;

import com.getcapacitor.Logger;

public class SafeSDK {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
