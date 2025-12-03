export interface SafeSDKPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initialize(options: InitializeOptions): Promise<void>;
  subscribe(): Promise<{ action: Action }>;
  check(): Promise<{ action: Action }>;
  unsubscribe(): Promise<void>;
  setUserId(options: { userId: string }): Promise<void>;
  askForPermissions(): Promise<void>;
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
