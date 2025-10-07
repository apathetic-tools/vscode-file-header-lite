// src/core/headerInserter.ts

import type * as vscode from "vscode";
import type { FileHeaderLiteConfig } from "../config";
import {
	buildHeaderString,
	findRoleLabel,
	getFilePaths,
	hasValidHeader,
	type ResolvedLanguageTemplate,
} from "../utils";

/**
 * Compute the header text to insert for a given document.
 * Returns `undefined` if no header should be added.
 */
export function generateHeaderForDocument(
	config: FileHeaderLiteConfig,
	doc: vscode.TextDocument,
): string | undefined {
	const paths = getFilePaths(doc);

	// Skip if document already has a valid header
	if (hasValidHeader(doc, paths)) return;

	// Try languageId → then path
	let template: ResolvedLanguageTemplate | undefined;

	if (config.useLanguagesById) {
		template = generateHeaderByLanguageId(config, doc);
		if (template && template.state && template.state === "fallback") {
			template = undefined;
		}
	}

	if (!template && config.useLanguagesByPath) {
		template = generateHeaderByPath(config, doc, paths);
	}

	if (!template || !template.header || template.state === "disabled") return;

	const roleLabel = findRoleLabel(config, paths);
	return buildHeaderString(config, template, paths, roleLabel);
}

/**
 * Generate header based on VS Code language ID (languagesById).
 */
export function generateHeaderByLanguageId(
	config: FileHeaderLiteConfig,
	doc: vscode.TextDocument,
): ResolvedLanguageTemplate | undefined {
	const langId = doc.languageId;
	const langEntry = config.languagesById[langId];

	// Skip unknown or disabled languages
	if (!langEntry || langEntry.state === "disabled") return;
	if (!langEntry.header) return;

	return {
		header: langEntry.header,
		state: langEntry.state,
		language: langEntry.language ?? langId,
		format: langEntry.format,
		context: undefined,
	};
}

/**
 * Generate header based on file path (languagesByPath).
 * (Stub for future implementation)
 */
export function generateHeaderByPath(
	_config: FileHeaderLiteConfig,
	_doc: vscode.TextDocument,
	_paths: ReturnType<typeof getFilePaths>,
): ResolvedLanguageTemplate | undefined {
	return undefined; // placeholder for next step
}
