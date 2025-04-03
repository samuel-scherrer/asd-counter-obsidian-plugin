import { Plugin } from "obsidian";

export default class AsdCounter extends Plugin {
	statusBarElement: HTMLSpanElement;

	onload() {
		this.statusBarElement = this.addStatusBarItem().createEl("span");
		this.readActiveFileAndUpdateCount();

		this.app.workspace.on("editor-change", (editor) => {
			const content = editor.getDoc().getValue();
			this.updateCount(content);
		});

		this.app.workspace.on("active-leaf-change", () => {
			this.readActiveFileAndUpdateCount();
		});
	}

	onunload() {
		this.statusBarElement.remove();
	}

	private async readActiveFileAndUpdateCount() {
		const file = this.app.workspace.getActiveFile();
		
		if (file) {
			const content = await this.app.vault.read(file);
			this.updateCount(content);
		} else {
			this.updateCount("");
		}
	}

	private updateCount(fileContent: string) {
		const count = (fileContent.match(/\basd\b/gi) || []).length;
		this.statusBarElement.textContent = `asd count: ${count}`;
	}
}