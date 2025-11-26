import { WebPlugin } from '@capacitor/core';
import type { SafeSDKPlugin } from './definitions';
export declare class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
