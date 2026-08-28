var capacitorSafeSDK = (function (exports, core) {
    'use strict';

    const SafeSDK = core.registerPlugin('SafeSDK', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.SafeSDKWeb()),
    });

    class SafeSDKWeb extends core.WebPlugin {
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

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        SafeSDKWeb: SafeSDKWeb
    });

    exports.SafeSDK = SafeSDK;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
