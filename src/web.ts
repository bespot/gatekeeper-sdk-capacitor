import { WebPlugin } from '@capacitor/core';

import type { InitializeOptions, SafeSDKPlugin, Action, InitializeWithAccessTokenOptions } from './definitions';

export class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
  async initialize(options: InitializeOptions): Promise<void> {
    console.warn('SafeSDK.initialize is not implemented on web', options);
  }
  async initializeWithAccessToken(options: InitializeWithAccessTokenOptions): Promise<void> {
    console.warn('SafeSDK.initialize with access token is not implemented on web', options);
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
  async setAccessToken(options: { accessToken: string }): Promise<void> {
    console.warn('SafeSDK.setAccessToken is not implemented on web', options);
  }
  async askForLocationPermissions(): Promise<void> {
    console.warn('SafeSDK.askForPermissions is not implemented on web');
  }
  async askForStoragePermissions(): Promise<void> {
    console.warn('SafeSDK.askForStoragePermissions is not implemented on web');
  }
  async askForMediaAudioPermissions(): Promise<void> {
    console.warn('SafeSDK.askForMediaAudioPermissions is not implemented on web');
  }
  async enableLogging(options: { debugLoggingEnabled: boolean }): Promise<void> {
    console.warn('SafeSDK.enableLogging is not implemented on web', options);
  }
}
