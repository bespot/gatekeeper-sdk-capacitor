import type { PluginListenerHandle } from '@capacitor/core';

export interface SafeSDKPlugin {
  initialize(options: InitializeOptions): Promise<void>;
  subscribe(): Promise<void>;
  check(): Promise<{ action: Action }>;
  unsubscribe(): Promise<void>;
  setUserId(options: { userId: string }): Promise<void>;
  askForPermissions(): Promise<void>;
  addListener(eventName: 'receivedAction', listenerFunc: (action: Action) => void): Promise<PluginListenerHandle>;
}

export interface InitializeOptions {
  apiBaseUrl: string;
  apiKey: string;
  authTokenUrl: string;
  clientId: string;
  clientSecret: string;
  params?: { [key: string]: any };
}

export type ActionType = 'block' | 'limitAccess' | 'monitor' | 'notSafe' | 'safe';

export interface Action {
  type: ActionType;
  signature: string;
}
