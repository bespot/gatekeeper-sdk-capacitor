import { WebPlugin, PluginListenerHandle } from '@capacitor/core';

import type { InitializeOptions, SafeSDKPlugin, Action } from './definitions';

export class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
  async initialize(options: InitializeOptions): Promise<void> {
    console.warn('SafeSDK.initialize is not implemented on web', options);
  }
  async subscribe(): Promise<void> {
    console.warn('Safesdk.subscribe is not implemented on web');
    throw this.unimplemented('SafeSDK.subscribe is not implemented on web');
  }
  async check(): Promise<{ action: Action }> {
    console.warn('SafeSDK.check is not implemented on web');
    throw this.unimplemented('SafeSDK.check is not implemented on web');
  }
  async unsubscribe(): Promise<void> {
    console.warn('SafeSDK.unsubscribe is not implemented on web');
  }
  async setUserId(options: { userId: string }): Promise<void> {
    console.warn('SafeSDK.setUserId is not implemented on web', options);
  }
  async askForPermissions(): Promise<void> {
    console.warn('SafeSDK.askForPermissions is not implemented on web');
  }
  async addListener(
    eventName: 'receivedAction',
    listenerFunc: (action: Action) => void,
  ): Promise<PluginListenerHandle> {
    console.warn('SafeSDK.addListener is not implemented on web', eventName);
    return {
      remove: async () => {
        console.warn('SafeSDK listener removal is not implemented on web');
      },
    };
  }
}
