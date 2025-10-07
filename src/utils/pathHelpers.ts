// src/utils/pathHelpers.ts
import * as path from "path";
import * as vscode from "vscode";
import type { PathList } from "./types";

/**
 * Normalize a Windows-style path:
 * - Convert backslashes to forward slashes
 * - Uppercase drive letter (e.g. c:/ → C:/)
 */
function normalizePath(p: string): string {
	if (!p) return "";
	let normalized = p.replace(/\\/g, "/");
	// Uppercase drive letter if present
	normalized = normalized.replace(/^([a-z]):/, (_, d) => d.toUpperCase() + ":");
	return normalized;
}

export function getFilePaths(doc: vscode.TextDocument): PathList {
	const wsFolder = vscode.workspace.getWorkspaceFolder(doc.uri);

	const absolutePath = normalizePath(doc.uri.fsPath);
	const workspaceRoot = wsFolder
		? normalizePath(wsFolder.uri.fsPath)
		: undefined;
	const filename = path.basename(absolutePath);

	const relativePath = workspaceRoot
		? normalizePath(path.relative(workspaceRoot, absolutePath))
		: filename;

	return { absolutePath, relativePath, filename };
}
