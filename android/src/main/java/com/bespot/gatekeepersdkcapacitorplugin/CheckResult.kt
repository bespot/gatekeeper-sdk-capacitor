package com.bespot.gatekeepersdkcapacitorplugin

import com.bespot.shared.common.models.Action
import com.bespot.shared.common.util.empty

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