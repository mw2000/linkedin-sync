export interface LinkedinSyncSettings {
	oauthToken: string;
}

export const DEFAULT_SETTINGS: LinkedinSyncSettings = Object.freeze({
	oauthToken: null,
});