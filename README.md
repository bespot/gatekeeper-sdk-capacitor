# Bespot Gatekeeper Capacitor Plugin

## Intro to Gatekeeper

Bespot Gatekeeper is a highly customizable fraud prevention and geolocation verification platform for mobile and web applications. It verifies user locations, detects device integrity issues, and monitors network connections to help organizations—particularly in the iGaming, Media Streaming, and Financial Services industries—comply with regulations and protect digital transactions from fraud.

Capacitor plugins act as thin wrappers around the original native SDKs, allowing Angular/Ionic developers to integrate Gatekeeper easily in cross-platform applications for both **iOS** and **Android**, while relying on the same underlying fraud-detection engine.

## Features

See our [documentation](https://gatekeeper.docs.bespot.com/overview/features/) for an up-to-date list of fraud detections available across platforms.

# Installation

To install the `gatekeeper-sdk-capacitor` plugin in your Ionic/JavaScript project do the following:

1. From the root of your Ionic/Javascript app run: To pin to a specific version, append the tag (see [Releases](https://github.com/bespot/gatekeeper-sdk-capacitor/tags) for available versions):

```bash
npm install git+https://github.com/bespot/gatekeeper-sdk-capacitor.git#<version>
```

2. Sync Capacitor:

```bash
npx cap sync
```

---

# Capacitor for iOS

## Requirements

* iOS 15.0 or later
* Built and tested using Xcode 26

## Install with CocoaPods

1. Add the iOS platform, if you have not already:

   ```bash
   npx cap add ios
   ```

   This is the default — running `npx cap add ios` without any flag creates `ios/App` with a `Podfile`.

2. From your app root, edit the `Podfile` so it contains the `GatekeeperSdkCapacitor` and the `AntifraudSDK` pods as follows:

```ruby
require_relative '../../node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '15.0'
use_frameworks!

install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '../../node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '../../node_modules/@capacitor/ios'
  pod 'GatekeeperSdkCapacitor', :git => 'https://github.com/bespot/gatekeeper-sdk-capacitor', :tag => 'v1.2.0'
  pod 'AntifraudSDK', :git => 'https://github.com/bespot/antifraud-sdk-ios-release', :tag => '1.2.0'
end

target 'YourApp' do
  capacitor_pods
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

3. Run:

```bash
pod install
```

## Install with Swift Package Manager

### New iOS platform

If you have not added the iOS platform to your app yet, create it with Swift Package Manager directly:

```bash
npx cap add ios --packagemanager SPM
```

### Existing iOS platform (set up with CocoaPods)

This is the case if you already ran `npx cap add ios` without the `--packagemanager SPM` flag — your `ios/App` folder has a `Podfile`, `Podfile.lock`, and `App.xcworkspace`. Capacitor ships an assistant that removes CocoaPods from your iOS project and switches it to Swift Package Manager:

```bash
npx cap spm-migration-assistant
```

The command prints a few remaining manual steps to complete in Xcode — follow the [official Capacitor SPM migration guide](https://capacitorjs.com/docs/ios/spm#using-our-migration-tool) to finish them.

### iOS deployment target

Your iOS platform's deployment target must be at least what `GatekeeperSdkCapacitor` requires (see [Requirements](#requirements)). Swift Package Manager enforces this strictly and fails to build if it is not high enough. To check or raise it: in Xcode, select the **App** project in the navigator → **Build Settings** → search for `iOS Deployment Target` → set it to at least `15.0` for both the **PROJECT** and the **App** target. Then run `npx cap sync ios` again.

## Permissions

Add the following to your app's `Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your location is required for fraud-prevention analysis.</string>
```

## Authentication modes

As of v1.2.0 the SDK supports two mutually exclusive ways to authenticate:

| | OAuth 2.0 — `initialize()` | Bearer token — `initializeWithAccessToken()` |
|---|---|---|
| `API_BASE_URL` | required | required |
| `API_KEY` | required | required |
| `AUTH_TOKEN_URL` | required | not used |
| `CLIENT_ID` | required | not used |
| `CLIENT_SECRET` | required | not used |
| Access token | — | supplied at runtime by your app |

Pick one per app. In the bearer-token flow your backend acquires the short-lived JWT from the Gatekeeper authentication backend and returning it back to your app which passes it to the SDK, and refreshes with `setAccessToken()` before it expires. No client secret is embedded in the app.

## Configuration

### Using xcconfig files

To securely store your API credentials, you can use Xcode configuration files (`.xcconfig`). This approach keeps sensitive information out of your source code.

#### Step 1: Create Secrets.xcconfig

Create a file named `Secrets.xcconfig` in your app's main directory:

```
API_BASE_URL = the_provided_API_BASE_URL
API_KEY = the_provided_API_KEY
AUTH_TOKEN_URL = the_provided_oauth2_URL
CLIENT_ID = the_provided_oauth2_clientid
CLIENT_SECRET = the_provided_oauth2_clientsecret
```

If you only use the bearer-token flow, `API_BASE_URL` and `API_KEY` are sufficient — the three OAuth 2.0 entries can be omitted.

**Important:** Add `Secrets.xcconfig` to your `.gitignore` file to prevent committing sensitive credentials:

```
**/Secrets.xcconfig
```

#### Step 2: Add secrets to Info.plist

Add the following keys to your `Info.plist` file. The variables will be replaced with values from your `Secrets.xcconfig` during build:

```xml
<key>API_BASE_URL</key>
<string>$(API_BASE_URL)</string>
<key>API_KEY</key>
<string>$(API_KEY)</string>
<key>AUTH_TOKEN_URL</key>
<string>$(AUTH_TOKEN_URL)</string>
<key>CLIENT_ID</key>
<string>$(CLIENT_ID)</string>
<key>CLIENT_SECRET</key>
<string>$(CLIENT_SECRET)</string>
```

#### Step 3: Create configuration files

**1. If you installed with CocoaPods:**

Create two configuration files in your project root (e.g., `App-Debug.xcconfig` and `App-Release.xcconfig`):

**App-Debug.xcconfig:**
```
#include "Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig"
#include "App/Secrets.xcconfig"
```

**App-Release.xcconfig:**
```
#include "Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig"
#include "App/Secrets.xcconfig"
```

The first line in each file includes CocoaPods' own generated configuration and only exists once you have run `pod install`.

**2. If you installed with Swift Package Manager:**

Your iOS platform already has a single `ios/debug.xcconfig`, created by Capacitor and used for both the Debug and Release build configurations. Add the include to that existing file instead of creating new ones:

```
CAPACITOR_DEBUG = true
#include "App/Secrets.xcconfig"
```
**Note (both):** Adjust the path to `Secrets.xcconfig` based on where you placed it relative to the `.xcconfig` file you are editing.

#### Step 4: Link configuration files in Xcode
This step applies only if you installed with CocoaPods — Swift Package Manager projects already have `debug.xcconfig` linked to both build configurations, so there is nothing to do here.

1. Open your project in Xcode
2. Select your project in the Project Navigator
3. Select your app project
4. Go to the **Info** tab
5. Under **Configurations**, set:
   - **Debug**: `App-Debug.xcconfig`
   - **Release**: `App-Release.xcconfig`

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
* `initialize(options: InitializeOptions): Promise<void>` *(required on iOS for OAuth 2.0 authentication)*
* `initializeWithAccessToken(options: InitializeWithAccessTokenOptions): Promise<void>` *(required on iOS for bearer token authentication)*
* `setAccessToken(options: { accessToken: string }): Promise<void>` *(iOS only)*
* `setUserId(options: { userId: string }): Promise<void>` *(optional)*
* `check(): Promise<{ action: Action }>` *(on-demand checks)*
* `subscribe(): Promise<void>` *(periodic checks)*
* `unsubscribe(): Promise<void>` *(stop periodic checks)*
* `enableLogging(options: { debugLoggingEnabled: boolean }): Promise<void>` *(Android only - optional)*

## Events

Emitted while a subscription is active. See [Subscribe](#subscribe).

| Event | Payload | Meaning |
|---|---|---|
| `receivedAction` | `Action` | A new fraud-detection result |
| `subscribeError` | `SafeSDKError` | The subscription failed or could not be established |

## Models

```ts
// Initialization with OAuth 2.0 credentials
export interface InitializeOptions {
  apiBaseUrl: string;
  apiKey: string;
  authTokenUrl: string;
  clientId: string;
  clientSecret: string;
  params?: { [key: string]: any };
}

// Initialization with a bearer token
export interface InitializeWithAccessTokenOptions {
  apiBaseUrl: string;
  apiKey: string;
  accessToken: string;
  params?: { [key: string]: any };
}
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
  | 'INVALID_TOKEN'
  | 'AUTH_ERROR'
  | 'ALREADY_INITIALIZED'
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
  params: { debugLoggingEnabled: true },
});
```

The plugin will automatically read the API credentials from your `Info.plist` (populated from `Secrets.xcconfig` during build).

### Initialize with an access token
*(iOS only)* Alternative to OAuth 2.0. Pass a bearer token issued by your own backend:

```ts
await SafeSDK.initializeWithAccessToken({
  accessToken,
  params: { debugLoggingEnabled: true },
});
```

`API_BASE_URL` and `API_KEY` are still read from your `Info.plist`; the OAuth 2.0 entries are not used.

> **Important:** Call `initialize()` **or** `initializeWithAccessToken()`, once per application launch.

### Refresh the access token
*(iOS only)* Bearer tokens are short-lived. Supply a fresh one before the current token expires — the SDK keeps running with the new token, no re-initialization needed:

```ts
await SafeSDK.setAccessToken({ accessToken });
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

On failure the promise rejects with a `SafeSDKErrorType` in `error.code`.

### Subscribe
Subscribe for continuous fraud detection updates (event delivery) using the subscribe method *(currently implemented on iOS only)*:

Results and errors are **not** delivered through the returned promise — register both listeners before subscribing:

```ts
const actionListener = await SafeSDK.addListener('receivedAction', (action) => {
  // action.type, action.signature
});

const errorListener = await SafeSDK.addListener('subscribeError', (error) => {
  // error.code, error.message
});

await SafeSDK.subscribe();
```
*This method provides exactly the same result as on-demand check, but periodically.*

Wrapping `subscribe()` in `try/catch` will not surface SDK errors — `subscribeError` is the only channel for them.

### Unsubscribe
Stop the active subscription to fraud detection updates *(currently implemented on iOS only)*:
```ts
await SafeSDK.unsubscribe();
await actionListener.remove();
await errorListener.remove();
```

### Logging
Debug logging should **not be used in production builds**.

**iOS** — enabled at initialization time, through the `params` object:

```ts
await SafeSDK.initialize({
  params: { debugLoggingEnabled: true },
});

// or, when using a bearer token
await SafeSDK.initializeWithAccessToken({
  accessToken,
  params: { debugLoggingEnabled: true },
});
```

`enableLogging()` is not implemented on iOS.

**Android** — enabled or disabled at any time:

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

© 2026 [Bespot](https://bespot.com/) Private Company. All rights reserved. See `LICENSE` for more information.
