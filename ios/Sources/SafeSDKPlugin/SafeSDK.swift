import Foundation
import AntifraudSDK

@objc public class SafeSDK: NSObject {

    @objc public func initialize(apiBaseUrl: String, apiKey: String, authTokenUrl: String, clientId: String, clientSecret: String, params: [String: Any]? = nil) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.initialize(apiBaseUrl: apiBaseUrl, apiKey: apiKey, authTokenUrl: authTokenUrl, clientId: clientId, clientSecret: clientSecret, params: params)

    }

    public func subscribe(_ completion: @escaping (Result<Action, SDKError>) -> Void) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.subscribe { result in
            DispatchQueue.main.async {
                completion(result)
            }
        }
    }

    public func check(_ checkCompletion: @escaping (Result<Action, SDKError>) -> Void) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.check { result in
            DispatchQueue.main.async {
                checkCompletion(result)
            }
        }
    }

    public func unsubscribe() {
        AntifraudSDK.SafeSDK.sharedSafeSDK.unsubscribe()
    }

    public func setUserId(_ userId: String) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.setUserId(userId)
    }
}
