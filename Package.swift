// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "GatekeeperSdkCapacitor",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "GatekeeperSdkCapacitor",
            targets: ["SafeSDKPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "SafeSDKPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/SafeSDKPlugin"),
        .testTarget(
            name: "SafeSDKPluginTests",
            dependencies: ["SafeSDKPlugin"],
            path: "ios/Tests/SafeSDKPluginTests")
    ]
)