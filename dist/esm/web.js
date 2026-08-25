import { WebPlugin } from '@capacitor/core';
export class SafeSDKWeb extends WebPlugin {
    async initialize(options) {
        console.warn('SafeSDK.initialize is not implemented on web', options);
    }
    async initializeWithAccessToken(options) {
        console.warn('SafeSDK.initialize with access token is not implemented on web', options);
    }
    async subscribe() {
        console.warn('Safesdk.subscribe is not implemented on web');
        throw this.unimplemented('SafeSDK.subscribe is not implemented on web');
    }
    async check() {
        console.warn('SafeSDK.check is not implemented on web');
        throw this.unimplemented('SafeSDK.check is not implemented on web');
    }
    async unsubscribe() {
        console.warn('SafeSDK.unsubscribe is not implemented on web');
    }
    async setUserId(options) {
        console.warn('SafeSDK.setUserId is not implemented on web', options);
    }
    async setAccessToken(options) {
        console.warn('SafeSDK.setAccessToken is not implemented on web', options);
    }
    async askForLocationPermissions() {
        console.warn('SafeSDK.askForPermissions is not implemented on web');
    }
    async askForStoragePermissions() {
        console.warn('SafeSDK.askForStoragePermissions is not implemented on web');
    }
    async askForMediaAudioPermissions() {
        console.warn('SafeSDK.askForMediaAudioPermissions is not implemented on web');
    }
    async enableLogging(options) {
        console.warn('SafeSDK.enableLogging is not implemented on web', options);
    }
}
//# sourceMappingURL=web.js.map