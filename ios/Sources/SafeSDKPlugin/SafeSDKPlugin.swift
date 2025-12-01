import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SafeSDKPlugin)
public class SafeSDKPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SafeSDKPlugin"
    public let jsName = "SafeSDK"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = SafeSDK()

    @objc func initialize(_ call: CAPPluginCall) {
        guard let apiBaseUrl = call.getString("apiBaseUrl"), let apiKey = call.getString("apiKey"), let authTokenUrl = call.getString("authTokenUrl"), let clientId = call.getString("clientId"), let clientSecret = call.getString("clientSecret"), let params = call.getObject("params") as? [String: Any] else {
            call.reject("Missing required initialize parameters")
            return
        }

        implementation.initialize(apiBaseUrl: apiBaseUrl, apiKey: apiKey, authTokenUrl: authTokenUrl, clientId: clientId, clientSecret: clientSecret, params: params)
        call.resolve()
    }

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
