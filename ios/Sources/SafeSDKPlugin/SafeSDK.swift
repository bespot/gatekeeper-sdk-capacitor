import Foundation
import AntifraudSDK

@objc public class SafeSDK: NSObject {

    @objc public func initialize(apiBaseUrl: String, apiKey: String, authTokenUrl: String, clientId: String, clientSecret: String, params: [String: Any]? = nil) {
        AntifraudSDK.SafeSDK.sharedSafeSDK.initialize(apiBaseUrl: apiBaseUrl, apiKey: apiKey, authTokenUrl: authTokenUrl, clientId: clientId, clientSecret: clientSecret, params: params)

    }

    public func subscribe(_ completion: @escaping (Result<Action, SDKError>) -> Void) -> Void {
        AntifraudSDK.SafeSDK.sharedSafeSDK.subscribe { result in
            DispatchQueue.main.async {
                completion(result)
            }
        }
    }

    func unsubscribe() {
        AntifraudSDK.SafeSDK.sharedSafeSDK.unsubscribe()
    }

    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
