import { WebPlugin } from '@capacitor/core';

import type { SafeSDKPlugin } from './definitions';

export class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
