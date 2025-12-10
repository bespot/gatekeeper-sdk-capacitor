package com.bespot.gatekeepersdkcapacitorplugin

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import com.bespot.shared.common.models.Action
import com.bespot.shared.core.Failure
import com.bespot.shared.core.FraudulentCheckObserver
import com.bespot.shared.core.SafeSdk
import com.getcapacitor.Logger

class SafeSDK: FraudulentCheckObserver {

    private val safeSdk: SafeSdk = SafeSdk

    private val _checkResult: MutableState<Result<CheckResult>> = mutableStateOf(Result.success(CheckResult.empty()))

    init {
        safeSdk.logging(true)
    }

    override fun onSuccess(
        action: Action,
        signature: String,
    ) {
        _checkResult.value = Result.success(CheckResult(action = action, ticket = signature))
        Logger.info("Gatekeeper Plugin", action.name)
    }

    override fun onError(error: Failure) {
        _checkResult.value = Result.failure(error)
    }

    fun echo(value: String?): String? {
        Logger.info("Echo", value)
        safeSdk.check(this)
        return value
    }
}
