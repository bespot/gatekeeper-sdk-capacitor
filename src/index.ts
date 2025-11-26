import { registerPlugin } from '@capacitor/core';

import type { SafeSDKPlugin } from './definitions';

const SafeSDK = registerPlugin<SafeSDKPlugin>('SafeSDK', {
  web: () => import('./web').then((m) => new m.SafeSDKWeb()),
});

export * from './definitions';
export { SafeSDK };
