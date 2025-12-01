import Foundation
import AntifraudSDK

@objc public class SafeSDK: NSObject {

    @objc public func initialize(apiBaseUrl: String, apiKey: String, authTokenUrl: String, clientId: String, clientSecret: String, params: [String: Any]? = nil) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.initialize(apiBaseUrl: apiBaseUrl, apiKey: apiKey, authTokenUrl: authTokenUrl, clientId: clientId, clientSecret: clientSecret, params: params)

    }

//    @objc public func initialize(apiBaseUrl: String, apiKey: String, authTokenUrl: String, clientId: String, clientSecret: String, params: [String: Any]? = nil) {
//        AntifraudSDK.SafeSDK.sharedSafeSDK.initialize(apiBaseUrl: apiBaseUrl, apiKey: apiKey, authTokenUrl: authTokenUrl, clientId: clientId, clientSecret: clientSecret, params: params)
//
//    }

    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
