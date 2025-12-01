export interface SafeSDKPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initialize(options: InitializeOptions): Promise<void>;
}

export interface InitializeOptions {
  apiBaseUrl: string;
  apiKey: string;
  authTokenUrl: string;
  clientId: string;
  clientSecret: string;
  params?: { [key: string]: any };
}
