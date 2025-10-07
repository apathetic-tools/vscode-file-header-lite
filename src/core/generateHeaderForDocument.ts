// src/core/headerInserter.ts

import type * as vscode from "vscode";
import type { FileHeaderLiteConfig } from "../config";
import { buildHeaderString } from "../utils/buildHeaderString";
import { findRoleLabel } from "../utils/findRoleLabel";
import { hasValidHeader } from "../utils/hasValidHeader";
import { getFilePaths } from "../utils/pathHelpers";

/**
 * Compute the header text to insert for a given document.
 * Returns `undefined` if no header should be added.
 */
export function generateHeaderForDocument(
	config: FileHeaderLiteConfig,
	doc: vscode.TextDocument,
): string | undefined {
	// Respect global toggle
	if (!config.useLanguagesById) return;

	const langId = doc.languageId;
	const langEntry = config.languagesById[langId];

	// Skip unknown or disabled languages
	if (!langEntry || !langEntry.header) return;
	if (langEntry.state && langEntry.state === "disabled") return;

	// Skip languages that define no header template
	if (!langEntry.header) return;

	const paths = getFilePaths(doc);

	if (hasValidHeader(doc, paths)) return; // already present

	const roleLabel = findRoleLabel(config, paths);

	return buildHeaderString(config, langId, paths, roleLabel);
}
