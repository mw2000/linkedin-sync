import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { LinkedinSyncSettings, DEFAULT_SETTINGS } from 'settings';
import LinkedinSyncSettingTab from 'settings-tab';
import { PostToLinkedinCommand } from 'commands/post';
import { LinkedinAPI } from 'api';


export default class LinkedinSync extends Plugin {
	settings: LinkedinSyncSettings;
  	linkedin: any;
	api: LinkedinAPI;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LinkedinSyncSettingTab(this.app, this));

		this.api = new LinkedinAPI(this.settings);

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand(new PostToLinkedinCommand(this.api));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}