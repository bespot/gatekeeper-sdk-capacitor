//
//  SecretsConfigHelper.swift
//  GatekeeperSdkCapacitor
//
//  Created by vangelis spyrou on 5/1/26.
//

import Foundation

struct SecretsConfigHelper {
    static func getApiBaseUrl() -> String? {
        return Bundle.main.object(forInfoDictionaryKey: "API_BASE_URL") as? String
    }

    static func getApiKey() -> String? {
        return Bundle.main.object(forInfoDictionaryKey: "API_KEY") as? String
    }

    static func getAuthTokenUrl() -> String? {
        return Bundle.main.object(forInfoDictionaryKey: "AUTH_TOKEN_URL") as? String
    }

    static func getClientId() -> String? {
        return Bundle.main.object(forInfoDictionaryKey: "CLIENT_ID") as? String
    }

    static func getClientSecret() -> String? {
        return Bundle.main.object(forInfoDictionaryKey: "CLIENT_SECRET") as? String
    }
}
