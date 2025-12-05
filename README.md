# Bespot Gatekeeper Capacitor Plugin

## Intro to Gatekeeper
Bespot Gatekeeper is a highly customizable fraud prevention and geolocation verification platform for mobile and web applications. It verifies user locations, detects device integrity issues, and monitors network connections to help organizations—particularly in the iGaming, Media Streaming, and Financial Services industries—comply with regulations and protect digital transactions from fraud.

## Features

See our [documentation](https://gatekeeper.docs.bespot.com/overview/features/) for an up-to-date list of fraud detections available across platforms.

# Installation

To install the `gatekeeper-sdk-capacitor` plugin in your Ionic/JavaScript project do the following:

1. From the root of your Ionic/Javascript app run:
```
npm install git+https://github.com/bespot/gatekeeper-sdk-capacitor.git
```

2. Sync Capacitor:
```
npx cap sync ios
```

# Capacitor for iOS

## Requirements

- iOS 15.0+
- Xcode 16

## Install with CocoaPods

1. From your app root, edit the `Podfile` so it contains the `GatekeeperSdkCapacitor` and the `AntifraudSDK` pods as follows:

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '15.0'
use_frameworks!

# workaround to avoid Xcode caching of Pods that requires
# Product -> Clean Build Folder after new Cordova plugins installed
# Requires CocoaPods 1.6 or newer
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'GatekeeperSdkCapacitor', :git => 'https://github.com/bespot/gatekeeper-sdk-capacitor', :tag => 'v1.0.0'
  pod 'AntifraudSDK', :git => 'https://github.com/bespot/antifraud-sdk-ios-release', :tag => '1.1.3'
end

target 'YourApp' do
  capacitor_pods
  # Add your Pods here
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

2. Run on your terminal:

```shell
pod install
```

## Permissions

SafeSDK requires access to **Location Services**. Add the following to your app's `Info.plist`:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is required for fraud-prevention analysis.</string>
```

## Import
In your app code (TypeScript or JavaScript):
```TypeScript
import { SafeSDK } from 'gatekeeper-sdk-capacitor';
```

## API
The following methods are available:
- `askForPermissions(): Promise<void>` (optional, required for location aware fraud checks)
- `initialize(options: InitializeOptions): Promise<void>` (required for the SDK to function)
- `setUserId(options: { userId: string }): Promise<void>` (optional)
- `check(): Promise<{ action: Action }>` (optional, required for on-demand fraud checks)
- `subscribe(): Promise<{ action: Action }>` (optional, required for periodic fraud checks)
- `unsubscribe(): Promise<void>` (optional, required for periodic fraud checks)

## Model
```TypeScript
export type ActionType =
  | 'block'
  | 'limitAccess'
  | 'monitor'
  | 'notSafe'
  | 'safe';

export interface Action {
  type: ActionType;
  signature: string;
}
```

## Usage

### Ask for location permission
Request user location permission to enable location aware fraud checks:
```TypeScript
await SafeSDK.askForPermissions();
```

### Initialize the SafeSDK
Call **once** early in your app lifecycle:
```TypeScript
await SafeSDK.initialize({
    apiBaseUrl: "the_provided_API_base_URL",
    apiKey: "the_provided_API_key",
    authTokenUrl: "the_provided_oauth2_URL",
    clientId: "the_provided_oauth2_clientid",
    clientSecret: "the_provided_oauth2_clientsecret",
    params: { debugLoggingEnabled: Bool }, // optional
  });
```

### Identify user
After initialization is completed, SafeSDK supports holding a customer/client related unique user identifier which can be provided at any time using the following method:
```TypeScript
await SafeSDK.setUserId({ userId });
```

### On-demand check
Use the following method to make an informed decision on what action to take in case of detected fraudulent activities by SafeSDK:
```TypeScript
try {
  const { action } = await SafeSDK.check();
  console.log(`Action: ${action.type}, signature: ${action.signature}`);
} catch (err) {
  console.error(`Check failed with error: ${err}`);
}
```

### Subscribe to Fraud Detection Updates
You can now subscribe to continuous fraud detection results using the `subscribe()` method:
```TypeScript
try {
  const { action } = await SafeSDK.subscribe();
  console.log(`Action: ${action.type}, signature: ${action.signature}`);
} catch (err) {
  console.error(`Subscription failed with error: ${err}`);
}
```

### Unsubscribe from Fraud Detection Updates
Terminates the active subscription to fraud detection updates. Use this method when you no longer wish to receive updates from the SDK.
```TypeScript
await SafeSDK.unsubscribe();
```

## Support

We use [Github](https://github.com/bespot/antifraud-sdk-ios-release/issues) issues to track bugs and enhancements.

- If you find a bug please fill out an issue report. Provide as much information as possible.
- If you think of a great idea please fill out an issue as a proposal for your idea.

In case you need to contact us, drop us an email at: dev@bespot.com


## License
© 2025 [Bespot](https://bespot.com/) Private Company. All rights reserved. See `LICENSE` for more information.
