import type { PluginListenerHandle } from '@capacitor/core';

export interface SafeSDKPlugin {
  initialize(options?: InitializeOptions): Promise<void>;
  initializeWithAccessToken(options: InitializeWithAccessTokenOptions): Promise<void>;
  subscribe(): Promise<void>;
  check(): Promise<{ action: Action }>;
  unsubscribe(): Promise<void>;
  enableLogging(options: { debugLoggingEnabled: boolean }): Promise<void>;
  setUserId(options: { userId: string }): Promise<void>;
  setAccessToken(options: { accessToken: string }): Promise<void>;
  askForLocationPermissions(): Promise<void>;
  askForStoragePermissions(): Promise<void>;
  askForMediaAudioPermissions(): Promise<void>;
  addListener(eventName: 'receivedAction', listenerFunc: (action: Action) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'subscribeError', listenerFunc: (error: SafeSDKError) => void): Promise<PluginListenerHandle>;
}

export interface InitializeOptions {
  params?: { [key: string]: any };
}

export interface InitializeWithAccessTokenOptions {
  accessToken: string;
  params?: { [key: string]: any };
}

export type ActionType = 'BLOCK' | 'LIMIT_ACCESS' | 'MONITOR' | 'NOT_SAFE' | 'SAFE';

export interface Action {
  type: ActionType;
  signature: string;
}

export interface SafeSDKError {
  code: SafeSDKErrorType;
  message: string;
}

export type SafeSDKErrorType =
  | 'NETWORK_CONNECTION'
  | 'NO_ACTIVE_API_KEY'
  | 'NO_CHECKS_AVAILABLE'
  | 'NO_RECIPE_FOUND'
  | 'NOT_INITIALIZED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR'
  | 'INVALID_TOKEN'
  | 'AUTH_ERROR'
  | 'ALREADY_INITIALIZED';
