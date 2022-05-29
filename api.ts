import { request } from "obsidian";
import { LinkedinSyncSettings } from "settings";

export class LinkedinAPI {
    settings: LinkedinSyncSettings

    constructor(settings: LinkedinSyncSettings) {
      this.settings = settings;
    }

    call (endpoint: string, options: any) : Promise<string> {
      options = {
        url: `https://api.linkedin.com/v2/${endpoint}`,
        method: options && options.method || 'GET',
        body: options && options.body &&  JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.settings.oauthToken}`,
        },
    };
            
        return request(options);
    }
}

