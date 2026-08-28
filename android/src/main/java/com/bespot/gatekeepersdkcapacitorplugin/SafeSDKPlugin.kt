package com.bespot.gatekeepersdkcapacitorplugin

import android.Manifest
import com.bespot.shared.core.Failure
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback


@CapacitorPlugin(
    name = "SafeSDK",
    permissions = [
        Permission(
            alias = "location",
            strings = [
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ]
        ),
        Permission(
            alias = "storage",
            strings = [
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            ]
        ),
        Permission(
            alias = "media-audio",
            strings = [
                Manifest.permission.READ_MEDIA_AUDIO
            ]
        )
    ]
)
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
    fun initializeWithAccessToken(call: PluginCall) {
        val accessToken = call.getString("accessToken")
        val apiBaseUrl = resString("antifraud_sdk_api_url")
        val apiKey = resString("antifraud_sdk_key")
        if (apiBaseUrl.isNullOrEmpty() || apiKey.isNullOrEmpty()) {
            return call.reject("Missing required initialize parameters")
        }
        if (accessToken.isNullOrEmpty()) {
            return call.reject("Missing required accessToken parameter")
        }
        implementation.initializeWithAccessToken(apiBaseUrl, apiKey, accessToken)
        call.resolve()
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
    fun setAccessToken(call: PluginCall) {
        val value = call.getString("accessToken") ?: return call.reject("Missing required 'accessToken' parameter")
        implementation.setAccessToken(value)
        call.resolve()
    }

    @PluginMethod
    fun enableLogging(call: PluginCall) {
        val value = call.getBoolean("debugLoggingEnabled") ?: return call.reject("Missing required boolean 'debugLoggingEnabled'")
        implementation.enableLogging(value)
        call.resolve()
    }

    @PluginMethod
    fun askForLocationPermissions(call: PluginCall) {
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationPermsCallback")
        } else {
            call.resolve()
        }
    }

    @PermissionCallback
    private fun locationPermsCallback(call: PluginCall) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            call.resolve()
        } else {
            call.reject("Location permission denied")
        }
    }

    @PluginMethod
    fun askForStoragePermissions(call: PluginCall) {
        if (getPermissionState("storage") != PermissionState.GRANTED) {
            requestPermissionForAlias("storage", call, "storagePermsCallback")
        } else {
            call.resolve()
        }
    }

    @PermissionCallback
    private fun storagePermsCallback(call: PluginCall) {
        if (getPermissionState("storage") == PermissionState.GRANTED) {
            call.resolve()
        } else {
            call.reject("Storage permission denied")
        }
    }

    @PluginMethod
    fun askForMediaAudioPermissions(call: PluginCall) {
        if (getPermissionState("media-audio") != PermissionState.GRANTED) {
            requestPermissionForAlias("media-audio", call, "mediaAudioPermsCallback")
        } else {
            call.resolve()
        }
    }

    @PermissionCallback
    private fun mediaAudioPermsCallback(call: PluginCall) {
        if (getPermissionState("media-audio") == PermissionState.GRANTED) {
            call.resolve()
        } else {
            call.reject("Media-audio permission denied")
        }
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
            is Failure.InvalidToken -> "INVALID_TOKEN" to "The access token is invalid or expired"
            is Failure.AuthError -> "AUTH_ERROR" to "Authentication failed"
            is Failure.AlreadyInitialized -> "ALREADY_INITIALIZED" to "The SDK is already initialized"
        }
    }

    // Resolves a host-app string resource by name (e.g. antifraud_sdk_api_url). These are
    // declared by the app.
    private fun resString(name: String): String? {
        val id = context.resources.getIdentifier(name, "string", context.packageName)
        return if (id != 0) context.getString(id) else null
    }
}
