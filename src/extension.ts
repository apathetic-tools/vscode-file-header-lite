// src/extension.ts
import { minimatch } from "minimatch";
import * as path from "path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		const doc = event.document;

		// Skip untitled or empty docs
		if (doc.isUntitled || doc.lineCount === 0) return;

		const config = vscode.workspace.getConfiguration("filenameHeader");
		const languages = config.get<Record<string, string>>("languages") || {};
		const roles = config.get<Record<string, string>>("roles") || {};
		const addLanguageLabel = config.get<boolean>("addLanguageLabel", true);

		const langId = doc.languageId;
		const format = languages[langId];
		if (!format) return; // no format for this language

		const wsFolder = vscode.workspace.getWorkspaceFolder(doc.uri);
		const relativeFile = wsFolder
			? path.relative(wsFolder.uri.fsPath, doc.uri.fsPath)
			: path.basename(doc.uri.fsPath);

		const fileName = path.basename(doc.uri.fsPath);

		// Match role via globbing
		let role: string | undefined;
		for (const [pattern, label] of Object.entries(roles)) {
			if (minimatch(relativeFile, pattern)) {
				role = label;
				break;
			}
		}

		// Build label
		const langLabel = addLanguageLabel
			? ` (${doc.languageId.replace(/_/g, " ")})`
			: "";

		const roleLabel = role ? `, ${role}` : "";

		const headerLine = format
			.replace("${fileName}", fileName)
			.replace("${relativeFile}", relativeFile);

		const finalHeader = `${headerLine}${langLabel}${roleLabel}`;

		const firstLine = doc.lineAt(0).text;

		if (firstLine.trim() === finalHeader.trim()) return; // already present

		event.waitUntil(
			Promise.resolve([
				vscode.TextEdit.insert(new vscode.Position(0, 0), finalHeader + "\n\n"),
			]),
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
