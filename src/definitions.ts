export interface SafeSDKPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
