'use strict';

var core = require('@capacitor/core');

const SafeSDK = core.registerPlugin('SafeSDK', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.SafeSDKWeb()),
});

class SafeSDKWeb extends core.WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SafeSDKWeb: SafeSDKWeb
});

exports.SafeSDK = SafeSDK;
//# sourceMappingURL=plugin.cjs.js.map
