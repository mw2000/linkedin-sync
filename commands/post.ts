import { Command } from 'obsidian';
import { Editor, MarkdownView } from 'obsidian';
import { LinkedinAPI } from 'api';

export class PostToLinkedinCommand implements Command {
    id: string;
    name: string;
    editorCallback?: (editor: Editor, view: MarkdownView) => any;
    api: LinkedinAPI;

    constructor(api: LinkedinAPI) {
        this.id = 'post-to-linkedin';
        this.name = 'Post To Linkedin';
        this.editorCallback = this.post;
        this.api = api;
    }

    async post(editor: Editor, view: MarkdownView) {
        let author = await this.api.call('me', {}).then(body => JSON.parse(body).id)

        const response = await this.api.call('shares', {
        	method: 'POST',
        	body: {
        		"distribution": {
        			"linkedInDistributionTarget": {}
        		},
        		"owner": `urn:li:person:${author}`,
        		"text": {
        			"text": editor.getValue()
        		}
        	}
            
        });

        console.log(response);
    }
}