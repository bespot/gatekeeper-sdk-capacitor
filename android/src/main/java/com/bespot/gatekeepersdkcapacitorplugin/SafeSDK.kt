package com.bespot.gatekeepersdkcapacitorplugin

import com.getcapacitor.Logger

class SafeSDK {
    fun echo(value: String?): String? {
        Logger.info("Echo", value)
        return value
    }
}
