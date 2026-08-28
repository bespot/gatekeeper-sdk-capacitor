// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "GatekeeperSdkCapacitor",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "GatekeeperSdkCapacitor",
            targets: ["SafeSDKPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(url: "https://github.com/bespot/antifraud-sdk-ios-release.git", from: "1.2.0")
    ],
    targets: [
        .target(
            name: "SafeSDKPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "AntifraudSDK", package: "antifraud-sdk-ios-release")
            ],
            path: "ios/Sources/SafeSDKPlugin"),
        .testTarget(
            name: "SafeSDKPluginTests",
            dependencies: ["SafeSDKPlugin"],
            path: "ios/Tests/SafeSDKPluginTests")
    ]
)
