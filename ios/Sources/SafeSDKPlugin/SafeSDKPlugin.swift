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
    private var locationManager: CLLocationManager?
    public let identifier = "SafeSDKPlugin"
    public let jsName = "SafeSDK"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "subscribe", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unsubscribe", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "check", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "askForPermissions", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = SafeSDK()

    @objc func initialize(_ call: CAPPluginCall) {
        guard let apiBaseUrl = call.getString("apiBaseUrl"), let apiKey = call.getString("apiKey"), let authTokenUrl = call.getString("authTokenUrl"), let clientId = call.getString("clientId"), let clientSecret = call.getString("clientSecret") else {
            call.reject("Missing required initialize parameters")
            return
        }

        let params = call.getObject("params") as? [String: Any]

        implementation.initialize(
            apiBaseUrl: apiBaseUrl,
            apiKey: apiKey,
            authTokenUrl: authTokenUrl,
            clientId: clientId,
            clientSecret: clientSecret,
            params: params
        )
        call.resolve()
    }

    @objc func subscribe(_ call: CAPPluginCall) {
        implementation.subscribe { result in
            switch result {
            case .success(let action):
                let actionDict: [String: Any] = [
                    "type": String(describing: action.actionType),
                    "signature": action.signature
                ]
                call.resolve(["action": actionDict])
            case .failure(let error):
                let code = error.rawValue
                let message = "SafeSDK subscribe failed: \(code)"
                call.reject(message, code, nil)
            }
        }
    }

    @objc func check(_ call: CAPPluginCall) {
        implementation.check { result in
            switch result {
            case .success(let action):
                let actionDict: [String: Any] = [
                    "type": String(describing: action.actionType),
                    "signature": action.signature
                ]
                call.resolve(["action": actionDict])
            case .failure(let error):
                let code = error.rawValue
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

    @objc func askForPermissions(_ call: CAPPluginCall) {
        self.locationManager = CLLocationManager()
        self.locationManager?.requestWhenInUseAuthorization()

        call.resolve()
    }

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}

//private func mapActionTypeToString(_ type: ActionType) -> String {
//    switch type {
//        case .block: return "block"
//        case .limitAccess: return "limitAccess"
//        case .monitor: return "monitor"
//        case .notSafe: return "notSafe"
//        case .safe: return "safe"
//    }
//}
