import { App, PluginSettingTab, Setting } from 'obsidian';
import LinkedinSync from 'main'
import { signIn } from 'commands/signIn';


export default class LinkedinSyncSettingTab extends PluginSettingTab {
	plugin: LinkedinSync;

	constructor(app: App, plugin: LinkedinSync) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Linkedin Sync Settings'});

		new Setting(containerEl)
			.setName('Connect Linkedin')
			.setDesc('Connect your Linkedin account to the plugin')
			.addButton(button => button
				.setButtonText('Connect')
				.onClick(async () => {
					signIn(this.plugin);
				})
			);
	}
}