import { WebPlugin } from '@capacitor/core';

import type { InitializeOptions, SafeSDKPlugin } from './definitions';

export class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async initialize(options: InitializeOptions): Promise<void> {
    console.warn('SafeSDK.initialize is not implemented on web', options);
  }
}
