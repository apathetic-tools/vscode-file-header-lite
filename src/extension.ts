// src/extension.ts
import * as vscode from "vscode";
import { defaultConfig } from "./config/";
import {
	buildHeaderString,
	findRoleLabel,
	getEffectiveConfig,
	getFilePaths,
	hasValidHeader,
} from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("filenameHeader");
		const config = getEffectiveConfig(defaultConfig, vsConfig);

		const langId = doc.languageId;
		const langEntry = config.languagesById[langId];

		if (!langEntry || !langEntry.header) return;
		if (langEntry.state && langEntry.state === "disabled") return;

		const format = langEntry.header;
		if (!format) return; // no format for this language

		const paths = getFilePaths(doc);

		if (hasValidHeader(doc, paths)) return; // already present

		const roleLabel = findRoleLabel(config, paths);

		const finalHeader = buildHeaderString(config, doc, paths, roleLabel);
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
