# v1.2.0 (2026-08-26)

### Added
- `initializeWithAccessToken` access token authentication as an alternative to OAuth2.
- `setAccessToken` refresh the access token.
- `INVALID_TOKEN`, `AUTH_ERROR`, `ALREADY_INITIALIZED` error codes to `SafeSDKErrorType`
- Swift Package Manager installation support.

### Changed
- `InitializeOptions` and `InitializeWithAccessTokenOptions` no longer accept `apiBaseUrl`, `apiKey`, `authTokenUrl`, `clientId` or `clientSecret`. 
These have been ignored since v1.1.2 — credentials are read natively from `Info.plist` (iOS) and string resources (Android).
- Minimum iOS deployment target raised to 15.0.

# v1.1.2 (2026-01-08)

### Fixed
- Used .xcconfig for loading secrets in iOS

# v1.1.1 (2025-12-23)

### Fixed
- `subscribe` now periodically polls the server instead of performing a single check.
- User location retrieval is now executed on the main thread.

# v1.1.0 (2025-12-16)

### Added
- Plugin for Android
- `SafeSDKError` interface 

### Changed
- `askForPermissions()` renamed to `askForLocationPermissions()`
- `ActionType` type

# v1.0.0 (2025-12-05)

### Added
- Plugin for iOS
