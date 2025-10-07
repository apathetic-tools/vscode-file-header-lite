// src/extension.ts
import * as vscode from "vscode";
import { defaultConfig } from "./config/";
import { generateHeaderForDocument } from "./core";
import { getEffectiveConfig } from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("fileHeader");
		const config = getEffectiveConfig(defaultConfig, vsConfig);

		const finalHeader = generateHeaderForDocument(config, doc);
		if (!finalHeader) return;

		event.waitUntil(
			Promise.resolve([
				vscode.TextEdit.insert(new vscode.Position(0, 0), finalHeader + "\n\n"),
			]),
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
