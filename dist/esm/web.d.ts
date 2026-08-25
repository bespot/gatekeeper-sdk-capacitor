import { WebPlugin } from '@capacitor/core';
import type { InitializeOptions, SafeSDKPlugin, Action, InitializeWithAccessTokenOptions } from './definitions';
export declare class SafeSDKWeb extends WebPlugin implements SafeSDKPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    initializeWithAccessToken(options: InitializeWithAccessTokenOptions): Promise<void>;
    subscribe(): Promise<void>;
    check(): Promise<{
        action: Action;
    }>;
    unsubscribe(): Promise<void>;
    setUserId(options: {
        userId: string;
    }): Promise<void>;
    setAccessToken(options: {
        accessToken: string;
    }): Promise<void>;
    askForLocationPermissions(): Promise<void>;
    askForStoragePermissions(): Promise<void>;
    askForMediaAudioPermissions(): Promise<void>;
    enableLogging(options: {
        debugLoggingEnabled: boolean;
    }): Promise<void>;
}
