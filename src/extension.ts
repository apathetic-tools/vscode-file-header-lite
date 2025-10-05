// src/extension.ts
import { minimatch } from "minimatch";
import * as path from "path";
import * as vscode from "vscode";
import { hasValidHeader, mergeConfig } from "./utils/";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;

		// Skip untitled or empty docs
		if (doc.isUntitled || doc.lineCount === 0) return;

		const vsConfig = vscode.workspace.getConfiguration("filenameHeader");

		const config = mergeConfig({
			languages: vsConfig.get("languages") || {},
			roles: vsConfig.get("roles") || {},
			addLanguageLabel: vsConfig.get("addLanguageLabel", true),
		});

		const langId = doc.languageId;
		const format = config.languages[langId];
		if (!format) return; // no format for this language

		const wsFolder = vscode.workspace.getWorkspaceFolder(doc.uri);
		const relativeFile = (
			wsFolder
				? path.relative(wsFolder.uri.fsPath, doc.uri.fsPath)
				: path.basename(doc.uri.fsPath)
		).replace(/\\/g, "/"); // windows vs linux/mac

		const fileName = path.basename(doc.uri.fsPath);

		if (hasValidHeader(doc, relativeFile, fileName)) return; // already present

		// Match role via globbing
		let role: string | undefined;
		for (const [pattern, label] of Object.entries(config.roles)) {
			if (minimatch(relativeFile, pattern)) {
				role = label;
				break;
			}
		}

		// Build label
		const langLabel = config.addLanguageLabel
			? ` (${doc.languageId.replace(/_/g, " ")})`
			: "";

		const roleLabel = role ? `, ${role}` : "";

		const headerLine = format
			.replace("${fileName}", fileName)
			.replace("${relativeFile}", relativeFile);

		const finalHeader = `${headerLine}${langLabel}${roleLabel}`;

		event.waitUntil(
			Promise.resolve([
				vscode.TextEdit.insert(new vscode.Position(0, 0), finalHeader + "\n\n"),
			]),
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
