import { registerPlugin } from '@capacitor/core';
const SafeSDK = registerPlugin('SafeSDK', {
    web: () => import('./web').then((m) => new m.SafeSDKWeb()),
});
export * from './definitions';
export { SafeSDK };
//# sourceMappingURL=index.js.map