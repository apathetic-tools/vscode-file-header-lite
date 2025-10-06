// src/utils/pathHelpers.ts

export type PathList = {
	absolutePath: string;
	relativePath: string;
	filename: string;
};

import * as path from "path";
import * as vscode from "vscode";

export function getFilePaths(doc: vscode.TextDocument): PathList {
	const wsFolder = vscode.workspace.getWorkspaceFolder(doc.uri);
	let absolutePath = doc.uri.fsPath;
	let relativePath = wsFolder
		? path.relative(wsFolder.uri.fsPath, absolutePath)
		: path.basename(absolutePath);
	const filename = path.basename(absolutePath);

	// normalize slashes to linux
	absolutePath = absolutePath.replace(/\\/g, "/");
	relativePath = relativePath.replace(/\\/g, "/");

	return { absolutePath, relativePath, filename };
}
