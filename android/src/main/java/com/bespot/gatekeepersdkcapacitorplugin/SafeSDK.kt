package com.bespot.gatekeepersdkcapacitorplugin

import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.MutableState
import com.bespot.shared.common.models.Action
import com.bespot.shared.core.Failure
import com.bespot.shared.core.FraudulentCheckObserver
import com.bespot.shared.core.SafeSdk
import com.bespot.shared.common.models.CheckResult
import com.bespot.shared.common.util.empty
import com.getcapacitor.Logger
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

data class CheckResult(
    val action: Action?,
    val ticket: String,
) {
    companion object {
        fun empty() =
            CheckResult(
                action = null,
                ticket = String.empty(),
            )
    }
}

class SafeSDK: FraudulentCheckObserver {

    private val safeSdk: SafeSdk = SafeSdk

//    private val _checkResult: MutableState<Result<CheckResult>> = mutableStateOf(Result.success(CheckResult.empty()))
//    val checkResult: State<Result<CheckResult>> = _checkResult

//    private val _timestamp: MutableState<String> = mutableStateOf("")
//    val timestamp: State<String> = _timestamp

    private fun getNow(): String =
        SimpleDateFormat(
            "HH:mm:ss",
            Locale.getDefault(),
        ).format(Calendar.getInstance().time)
    init {
        safeSdk.logging(true)
    }

    override fun onSuccess(
        action: Action,
        signature: String,
    ) {
//        _checkResult.value = Result.success(CheckResult(action = action, ticket = signature))
//        _timestamp.value = getNow()
    }

    override fun onError(error: Failure) {
//        _checkResult.value = Result.failure(error)
//        _timestamp.value = getNow()
    }

    fun echo(value: String?): String? {
        Logger.info("Echo", value)
        safeSdk.check(this)
        return value
    }
}
