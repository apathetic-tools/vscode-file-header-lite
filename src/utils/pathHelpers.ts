// src/utils/pathHelpers.ts
import type { PathList } from "./types";

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
