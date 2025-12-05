
Bespot Gatekeeper is a highly customizable fraud prevention and geolocation verification platform for mobile and web applications. It verifies user locations, detects device integrity issues, and monitors network connections to help organizations—particularly in the iGaming, Media Streaming, and Financial Services industries—comply with regulations and protect digital transactions from fraud.

## Features

See our [documentation](https://gatekeeper.docs.bespot.com/overview/features/) for an up-to-date list of fraud detections available across platforms.

## Requirements

- iOS 15.0+
- Xcode 16

# How to install the iOS `gatekeeper-sdk-capacitor` plugin in your Ionic/JavaScript project

From the root of your Ionic/Javascript app run
```
npm install git+https://github.com/bespot/gatekeeper-sdk-capacitor.git
```

Then sync Capacitor:
```
npx cap sync ios 
```

# iOS Setup

## Podfile

From your app root, edit `Podfile` so it contains:
```
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

target 'App' do
  capacitor_pods
  # Add your Pods here
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```
Then execute:
```
pod install
```

### Info.plist (location permission)
SafeSDK requires access to **Location Services**. Add the following to your app's `Info.plist`:
```
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is required for fraud-prevention analysis.</string>
```

## JavaScript/Ionic Usage 
### Import
In your app code (TypeScript or JavaScript):
```
import { SafeSDK } from 'gatekeeper-sdk-capacitor';
```
### API:
- `initialize(options: InitializeOptions): Promise<void>`
- `check(): Promise<{ action: Action }>`
- `subscribe(): Promise<{ action: Action }>`
- `unsubscribe(): Promise<void>`
- `setUserId(options: { userId: string }): Promise<void>`
- `askForPermissions(): Promise<void>` (helper for location permission, if implemented)

### Model:
```
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
### Ask for location permission
```
try {
  await SafeSDK.askForPermissions();
  console.log('Permissions requested');
} catch (err) {
  console.error('SafeSDK.askForPermissions failed', err);
}
```
### Initialize the AntifraudSDK 
Call **once** early in your app lifecycle:
```
await SafeSDK.initialize({
    apiBaseUrl: "the_provided_API_base_URL",
    apiKey: "the_provided_API_key",
    authTokenUrl: "the_provided_oauth2_URL",
    clientId: "the_provided_oauth2_clientid",
    clientSecret: "the_provided_oauth2_clientsecret",
    params: { debugLoggingEnabled: Bool }, // optional
  });
}
```
### Identify user (SetUserId)
After initialization is completed, SafeSDK supports holding a customer/client related unique user identifier which can be provided at any time using the following method:
```
await SafeSDK.setUserId({ userId });
console.log('Set userId to:', userId);
}
```
### On-demand check
Use the following method to make an informed decision on what action to take in case of detected fraudulent activities by SafeSDK:
```
try {
  const { action } = await SafeSDK.check();
  console.log('Check action:', action.type, action.signature);
} catch (err) {
  console.error('SafeSDK.check failed', err);
}
```
### Subscribe to Fraud Detection Updates
You can now subscribe to continuous fraud detection results using the `subscribe()` method:
```
try {
  const { action } = await SafeSDK.subscribe();
  console.log('Subscribe action:', action.type, action.signature);
} catch (err) {
  console.error('SafeSDK.subscribe failed', err);
}
```
### Unsubscribe from Fraud Detection Updates
Terminates the active subscription to fraud detection updates. Use this method when you no longer wish to receive updates from the SDK.
```
await SafeSDK.unsubscribe();
```

## Support

We use [Github](https://github.com/bespot/antifraud-sdk-ios-release/issues) issues to track bugs and enhancements.

- If you find a bug please fill out an issue report. Provide as much information as possible.
- If you think of a great idea please fill out an issue as a proposal for your idea.

In case you need to contact us, drop us an email at: dev@bespot.com


## License
© 2025 [Bespot](https://bespot.com/) Private Company. All rights reserved. See `LICENSE` for more information.
