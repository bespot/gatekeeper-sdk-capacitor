package com.bespot.gatekeepersdkcapacitorplugin

import com.bespot.shared.core.Failure
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "SafeSDK")
class SafeSDKPlugin : Plugin() {
    private val implementation = SafeSDK()

    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value")
        val ret = JSObject()
        ret.put("value", implementation.echo(value))
        call.resolve(ret)
    }

    @PluginMethod
    fun initialize(call: PluginCall) {
        call.unimplemented("Not implemented on Android. Initialization is done at application launch.")
    }

    @PluginMethod
    fun check(call: PluginCall) {
        implementation.check() { result ->
            result.onSuccess { checkResult ->
                val response = JSObject().apply {
                    put("action", JSObject().apply {
                        put("type", checkResult.action.toString())
                        put("signature", checkResult.ticket)
                    })
                }
                call.resolve(response)
            }
            result.onFailure { error ->
                val (code, message) = mapFailureToCodeAndMessage(error as Failure)

                val response = JSObject().apply {
                    put("code", code)
                    put("message", message)
                }
                val responseCode = code
                val responseMessage = "SafeSDK check failed: $message"
                call.reject(message, code, response)
            }
        }
    }

    @PluginMethod
    fun setUserId(call: PluginCall) {
        val value = call.getString("userId") ?: return call.reject("Missing required 'userId' parameter")
        implementation.setUserId(value)
        call.resolve()
    }

    @PluginMethod
    fun enableLogging(call: PluginCall) {
        val value = call.getBoolean("debugLoggingEnabled") ?: return call.reject("Missing required boolean 'debugLoggingEnabled'")
        implementation.enableLogging(value)
        call.resolve()
    }

    private fun mapFailureToCodeAndMessage(error: Failure): Pair<String, String> {
        return when (error) {
            is Failure.NetworkConnection -> "NETWORK_CONNECTION" to "Connection Error"
            is Failure.NoActiveApiKey -> "NO_ACTIVE_API_KEY" to "The API Key is either disabled or wrong"
            is Failure.NoChecksAvailableFailure -> "NO_CHECKS_AVAILABLE" to "The server did not find available checks"
            is Failure.NoRecipeFoundFailure -> "NO_RECIPE_FOUND" to "The application does not have a valid recipe"
            is Failure.NotInitialized -> "NOT_INITIALIZED" to "The SDK is not initialized"
            is Failure.ServerError -> "SERVER_ERROR" to "Remote Server Error"
            is Failure.UnknownError -> "UNKNOWN_ERROR" to "Unknown Error (see support section)"
        }
    }
}

