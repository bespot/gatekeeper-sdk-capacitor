import Foundation
import Capacitor
import AntifraudSDK
import CoreLocation

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SafeSDKPlugin)
public class SafeSDKPlugin: CAPPlugin, CAPBridgedPlugin {
    private var locationManager = CLLocationManager()
    public let identifier = "SafeSDKPlugin"
    public let jsName = "SafeSDK"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "subscribe", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unsubscribe", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "check", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "askForLocationPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enableLogging", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = SafeSDK()

    @objc func initialize(_ call: CAPPluginCall) {
        guard let apiBaseUrl = call.getString("apiBaseUrl"), let apiKey = call.getString("apiKey"), let authTokenUrl = call.getString("authTokenUrl"), let clientId = call.getString("clientId"), let clientSecret = call.getString("clientSecret") else {
            call.reject("Missing required initialize parameters")
            return
        }

        let params = call.getObject("params") as? [String: Any]

        DispatchQueue.main.async {
            self.implementation.initialize(
                apiBaseUrl: apiBaseUrl,
                apiKey: apiKey,
                authTokenUrl: authTokenUrl,
                clientId: clientId,
                clientSecret: clientSecret,
                params: params
            )
        }

        call.resolve()
    }

    @objc func subscribe(_ call: CAPPluginCall) {
        var hasResolved = false

        implementation.subscribe { result in
            switch result {
            case .success(let action):
                let actionDict: [String: Any] = [
                    "type": String(describing: action.actionType),
                    "signature": action.signature
                ]
                self.notifyListeners("receivedAction", data: actionDict)
                if !hasResolved {
                    call.resolve()
                    hasResolved = true
                }
            case .failure(let error):
                if !hasResolved {
                    let code = error.rawValue
                    let message = "SafeSDK subscribe failed: \(code)"
                    call.reject(message, code, nil)
                    hasResolved = true
                }
            }
        }
    }

    @objc func check(_ call: CAPPluginCall) {
        implementation.check { result in
            switch result {
            case .success(let action):
                let actionDict: [String: Any] = [
                    "type": self.mapActionType(actionType: action.actionType),
                    "signature": action.signature
                ]
                call.resolve(["action": actionDict])
            case .failure(let error):
                let code = self.mapError(error: error)
                let message = "SafeSDK check failed: \(code)"
                call.reject(message, code, nil)
            }
        }
    }

    @objc func unsubscribe(_ call: CAPPluginCall) {
        implementation.unsubscribe()
        call.resolve()
    }

    @objc func setUserId(_ call: CAPPluginCall) {
        guard let userId = call.getString("userId") else {
            call.reject("Missing required userId parameter")
            return
        }
        implementation.setUserId(userId)
        call.resolve()
    }

    @objc func askForLocationPermissions(_ call: CAPPluginCall) {
        self.locationManager.requestWhenInUseAuthorization()
        call.resolve()
    }

    @objc func enableLogging(_ call: CAPPluginCall) {
        call.unimplemented("Not implemented on iOS. Use the `debugLoggingEnabled` boolean parameter in the `initialize(_)` method to enable debug logging")
    }

    private func mapActionType(actionType: ActionType) -> String {
        switch actionType {
        case .block:
            return "BLOCK"
        case .limitAccess:
            return "LIMIT_ACCESS"
        case .monitor:
            return "MONITOR"
        case .notSafe:
            return "NOT_SAFE"
        case .safe:
            return "SAFE"
        @unknown default:
            return "DEFAULT_UNKNOWN_ACTION"
        }
    }

    private func mapError(error: SDKError) -> String {
        switch error {
        case .networkConnection:
            return "NETWORK_CONNECTION"
        case .noActiveApiKey:
            return "NO_ACTIVE_API_KEY"
        case .noChecksAvailableFailure:
            return "NO_CHECKS_AVAILABLE"
        case .noRecipeFoundFailure:
            return "NO_RECIPE_FOUND"
        case .notInitialized:
            return "NOT_INITIALIZED"
        case .serverError:
            return "SERVER_ERROR"
        case .unknownError:
            return "UNKNOWN_ERROR"
        @unknown default:
            return "DEFAULT_UNKNOWN_ERROR"
        }
    }
}
