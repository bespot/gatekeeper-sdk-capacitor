import { WebPlugin } from '@capacitor/core';

import type { InitializeOptions, SafeSDKPlugin, Action } from './definitions';

export class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async initialize(options: InitializeOptions): Promise<void> {
    console.warn('SafeSDK.initialize is not implemented on web', options);
  }
  async subscribe(): Promise<{ action: Action }> {
    console.warn('Safesdk.subscribe is not implemented on web');
    throw this.unimplemented('SafeSDK.subscribe is not implemented on web');
  }
}
