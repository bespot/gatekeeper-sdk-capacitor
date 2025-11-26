import Foundation

@objc public class SafeSDK: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
