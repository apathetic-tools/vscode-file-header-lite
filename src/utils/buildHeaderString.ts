import * as vscode from "vscode";
import type { FileHeaderLiteConfig } from "../config";
import type { PathList } from "./pathHelpers";

export function buildHeaderString(
	config: FileHeaderLiteConfig,
	doc: vscode.TextDocument,
	paths: PathList,
	roleLabel?: string,
): string | undefined {
	const langEntry = config.languagesById[doc.languageId];
	if (!langEntry || !langEntry.header || langEntry.state === "disabled") return;

	let fileLabel = "";
	switch (config.filePathStyle) {
		case "filename":
			fileLabel = paths.filename;
			break;
		case "absolutePath":
			fileLabel = paths.absolutePath;
			break;
		case "relativePath":
		default:
			fileLabel = paths.relativePath;
			break;
	}

	const langLabel = config.showLanguage
		? ` (${langEntry.language ?? doc.languageId.replace(/_/g, " ")})`
		: "";
	const roleText = roleLabel ? ` ${roleLabel}` : "";

	const headerLine = `${fileLabel}${langLabel}${roleText}`;
	return langEntry.header.replace("${headerLine}", headerLine);
}
