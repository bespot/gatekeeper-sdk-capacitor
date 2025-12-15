# Bespot Gatekeeper Capacitor Plugin

## Intro to Gatekeeper

Bespot Gatekeeper is a highly customizable fraud prevention and geolocation verification platform for mobile and web applications. It verifies user locations, detects device integrity issues, and monitors network connections to help organizations—particularly in the iGaming, Media Streaming, and Financial Services industries—comply with regulations and protect digital transactions from fraud.

Capacitor plugins act as thin wrappers around the original native SDKs, allowing Angular/Ionic developers to integrate Gatekeeper easily in cross-platform applications for both **iOS** and **Android**, while relying on the same underlying fraud-detection engine.

## Features

See our [documentation](https://gatekeeper.docs.bespot.com/overview/features/) for an up-to-date list of fraud detections available across platforms.

# Installation

To install the `gatekeeper-sdk-capacitor` plugin in your Ionic/JavaScript project do the following:

1. From the root of your Ionic/Javascript app run:

```bash
npm install git+https://github.com/bespot/gatekeeper-sdk-capacitor.git
```

2. Sync Capacitor:

```bash
npx cap sync
```

---

# Capacitor for iOS

## Requirements

* iOS 15.0+
* Xcode 16

## Install with CocoaPods

1. From your app root, edit the `Podfile` so it contains the `GatekeeperSdkCapacitor` and the `AntifraudSDK` pods as follows:

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '15.0'
use_frameworks!

install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'GatekeeperSdkCapacitor', :git => 'https://github.com/bespot/gatekeeper-sdk-capacitor', :tag => 'v1.0.0'
  pod 'AntifraudSDK', :git => 'https://github.com/bespot/antifraud-sdk-ios-release', :tag => '1.1.3'
end

target 'YourApp' do
  capacitor_pods
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

2. Run:

```bash
pod install
```

## Permissions

Add the following to your app's `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is required for fraud-prevention analysis.</string>
```

## Import

```ts
import { SafeSDK } from 'gatekeeper-sdk-capacitor';
```

---

# Capacitor for Android

The Android Capacitor plugin wraps the **Bespot Gatekeeper Android SDK**, exposing a Promise-based API suitable for Ionic/Angular applications.

## Requirements

* Android API 24+
* Android Studio (latest stable)

### Repositories

In `android/settings.gradle` (or the root `build.gradle` for legacy setups), add:

```kotlin
dependencyResolutionManagement {
  maven(url = "https://artifactory.bespot.com/artifactory/bespot-antifraud")
  maven(url = "https://artifactory.bespot.com/artifactory/bespot-logger")
  maven(url = "https://jitpack.io")
}
```

### Configuration values

Provide the required credentials either via `resValue` entries in `android/app/build.gradle`:

```kotlin
resValue("string", "antifraud_sdk_key", YOUR_API_KEY)
resValue("string", "antifraud_sdk_api_url", API_URL)
resValue("string", "antifraud_sdk_client_id", YOUR_CLIENT_ID)
resValue("string", "antifraud_sdk_client_secret", YOUR_CLIENT_SECRET)
resValue("string", "antifraud_sdk_oauth2_token_url", OAUTH2_TOKEN_URL)
```

or directly in `strings.xml`:

```xml
<string name="antifraud_sdk_key">YOUR_API_KEY</string>
<string name="antifraud_sdk_api_url">API_URL</string>
<string name="antifraud_sdk_client_id">YOUR_CLIENT_ID</string>
<string name="antifraud_sdk_client_secret">YOUR_CLIENT_SECRET</string>
<string name="antifraud_sdk_oauth2_token_url">OAUTH2_TOKEN_URL</string>
```

Optionally, use local and not version controlled `local.properties` to set the above vars.

## Permissions

Depending on your fraud-prevention strategy, declare the following permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
  android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
  android:maxSdkVersion="28" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO"/>
```

Runtime permission requests should be handled at the app level before invoking location-aware checks.

## Import

```ts
import { SafeSDK } from 'gatekeeper-sdk-capacitor';
```

---

# JavaScript / TypeScript API (iOS & Android)

## Available methods

* `askForLocationPermissions(): Promise<void>` *(Android & iOS)*
* `askForStoragePermissions(): Promise<void>` *(Android only)*
* `askForMediaAudioPermissions(): Promise<void>` *(Android only)*
* `initialize(options: InitializeOptions): Promise<void>` *(required on iOS)*
* `setUserId(options: { userId: string }): Promise<void>` *(optional)*
* `check(): Promise<{ action: Action }>` *(on-demand checks)*
* `subscribe(): Promise<{ action: Action }>` *(periodic checks)*
* `unsubscribe(): Promise<void>` *(stop periodic checks)*
* `enableLogging(options: { debugLoggingEnabled: boolean }): Promise<void>` *(Android only - optional)*

## Models

```ts
// Action result object
export interface Action {
  type: ActionType;
  signature: string;
}

// Action result type
export type ActionType = 'BLOCK'
  | 'LIMIT_ACCESS'
  | 'MONITOR'
  | 'NOT_SAFE'
  | 'SAFE';

// Error object
export interface SafeSDKError {
  code: SafeSDKErrorType;
  message: string;
}

// Error code type
export type SafeSDKErrorType = 'NETWORK_CONNECTION'
  | 'NO_ACTIVE_API_KEY'
  | 'NO_CHECKS_AVAILABLE'
  | 'NO_RECIPE_FOUND'
  | 'NOT_INITIALIZED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';
```

## Usage examples

### Request permissions
Initially, call the following methods to allow the user select the appropriate permissions.

```ts
await SafeSDK.askForLocationPermissions();
await SafeSDK.askForStoragePermissions();
await SafeSDK.askForMediaAudioPermissions();
```

### Initialize
Use this function **only in iOS** in order for the SDK to be initialized. As of this plugin version, initialization in Android is done during application launch:
```ts
await SafeSDK.initialize({
  apiBaseUrl: "the_provided_API_base_URL",
  apiKey: "the_provided_API_key",
  authTokenUrl: "the_provided_oauth2_URL",
  clientId: "the_provided_oauth2_clientid",
  clientSecret: "the_provided_oauth2_clientsecret",
  params: { debugLoggingEnabled: true },
});
```

### Identify user
After initialization is completed, SafeSDK supports holding a customer/client related unique user identifier which can be provided at any time using the following method:

```ts
await SafeSDK.setUserId({ userId });
```

### On-demand check
Use the following method to check on-demand for fraudulent activity:
```ts
const { action } = await SafeSDK.check();
// Act quickly based on the `action.type`
// Keep the `action.signature`
// [Optional] Send `action` over to your server to verify with Gatekeeper server
```

### Subscribe
Subscribe for continuous fraud detection updates (event delivery) using the subscribe method *(currently implemented on iOS only)*:
```ts
await SafeSDK.subscribe();
```
*This method provides exactly the same result as on-demand check, but periodically.*

### Unsubscribe
Stop the active subscription to fraud detection updates *(currently implemented on iOS only)*:
```ts
await SafeSDK.unsubscribe();
```

### Logging
Enable debug logging. Should **not be used in production builds** (Android only - use `initialize(_)` function `debugLoggingEnabled` parameter above to enable logging on iOS):

```ts
await SafeSDK.enableLogging({ debugLoggingEnabled: true });
```

---

## Support
We use [Github](https://github.com/bespot/antifraud-sdk-ios-release/issues) issues to track bugs and enhancements.

- If you find a bug please fill out an issue report. Provide as much information as possible.
- If you think of a great idea please fill out an issue as a proposal for your idea.

In case you need to contact us, drop us an email at: dev@bespot.com

## License

© 2025 [Bespot](https://bespot.com/) Private Company. All rights reserved. See `LICENSE` for more information.
